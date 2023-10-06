import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

export function configurePdfMake() {
  pdfMake.vfs = pdfMake.createVfsFromDir('/path/to/fonts/folder');
}
