"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function seedRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = [
            { nama_role: "Koordinator TU" },
            { nama_role: "Pimpinan" },
            { nama_role: "Arsiparis Surat Masuk" },
            { nama_role: "Arsiparis Surat Keluar" },
        ];
        yield prisma.role.createMany({
            data: roles,
            skipDuplicates: true,
        });
        console.log("Seed roles selesai!");
    });
}
