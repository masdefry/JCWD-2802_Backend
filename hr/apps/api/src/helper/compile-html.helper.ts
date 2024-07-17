import fs from 'fs';
import Handlebars from 'handlebars';

interface ICompileHtml{
    token: string;
    firstName: string;
}

export const compileHtml = ({ token, firstName }: ICompileHtml) => {
    const template = fs.readFileSync('src/public/email.html', 'utf-8')
    let compiledTemplate: any = Handlebars.compile(template)
    compiledTemplate = compiledTemplate({
        insertToken: token, 
        insertName: firstName
    })

    return compiledTemplate
}