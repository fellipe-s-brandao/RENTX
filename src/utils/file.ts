import fs from 'node:fs'

export const deleteFile = async(filename: string) => {

    // Verifica se tem o arquivo, se nao tiver retorna
    try{
        await fs.promises.stat(filename);
    }catch {
        return;
    }

    await fs.promises.unlink(filename);
}