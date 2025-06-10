import fetch from "node-fetch";
import { CustomError } from "../utils/customError";
import { BASE_URL_MODEL_API } from "../utils/env";
import { SuratRepository } from "../repositories/surat.repository";
import { ISurat } from "../interfaces/surat.interface";
import cloudinary, { handleUpload } from "../utils/cloudinary";

export const SuratService = {
  FindAll: async () => {
    try {
      const surat = await SuratRepository.FindAll();
      return surat;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  FindById: async (id: string) => {
    try {
      const surat = await SuratRepository.FindById(id);

      if (!surat) {
        throw new CustomError(404, "Surat not found");
      }

      return surat;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },
  SingleUpload: async (fileBuffer: Buffer, fileName: string) => {
    try {
      // Upload file ke Cloudinary
      const uploadResult: any = await handleUpload(fileBuffer, fileName);

      console.log("Cloudinary upload result:", uploadResult);
      const response = await fetch(`${BASE_URL_MODEL_API}/file`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_url: uploadResult.secure_url }),
      });

      if (response.status !== 200) {
        await cloudinary.uploader.destroy(uploadResult.public_id);
        throw new CustomError(500, "Failed to upload file to the model API!");
      }

      const data = await response.json();

      console.log("Response from model API:", data);

      return {
        cloudinaryUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        data,
      };
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  SaveConfirmedSurat: async (payload: ISurat) => {
    try {
      const surat = await SuratRepository.Create(payload);
      return surat;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  UpdateSurat: async (id: string, payload: ISurat) => {
    try {
      const surat = await SuratRepository.FindById(id);

      if (!surat) {
        throw new CustomError(404, "Surat not found");
      }

      const updatedSurat = await SuratRepository.Update(id, payload);

      return updatedSurat;
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },

  DeleteSurat: async (id: string) => {
    try {
      const surat = await SuratRepository.FindById(id);

      if (!surat) {
        throw new CustomError(404, "Surat not found");
      }

      await SuratRepository.Delete(id);

      return;
    } catch (error) {
      console.log("Error deleting surat:", error);
      throw new CustomError(500, "Internal Server Error");
    }
  },

  DeleteCloudinaryFile: async (publicId: string) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
      if (result.result !== "ok") {
        throw new CustomError(500, "Failed to delete file from Cloudinary");
      }
      return { success: true, message: "File deleted successfully" };
    } catch (error) {
      throw new CustomError(500, "Internal Server Error");
    }
  },
};
