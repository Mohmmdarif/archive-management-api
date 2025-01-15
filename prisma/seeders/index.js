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
const seed_jenis_kelamin_1 = require("./seed.jenis_kelamin");
const seed_roles_1 = require("./seed.roles");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeders running...");
        yield (0, seed_jenis_kelamin_1.seedJenisKelamin)();
        yield (0, seed_roles_1.seedRoles)();
        console.log("Seeders finished!");
    });
}
main().catch((e) => {
    console.error("Seeders failed! Error: ", e);
    process.exit(1);
});
