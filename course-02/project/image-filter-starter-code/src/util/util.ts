import fs from 'fs';
import Jimp = require('jimp');
import path from 'path';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

  /** deleteSavedFiles
   * 
   * Deletes all local temp files excluding the requested image
   * 
 * @param files string[]
 * @returns  true | false
 */
  export async function deleteSavedFiles(files: string[])
  {
     let savedFiles: string[] = fs.readdirSync(path.join(__dirname, "tmp")).map((file) => {
        return path.join(__dirname, "tmp", file);
      })

        for(const file of savedFiles)
        {        
            fs.unlinkSync(file);
        }
  }

  

  