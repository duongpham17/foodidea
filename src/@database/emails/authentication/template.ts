import { data } from '@data/business';
 
export const AUTHENTICATION = ({code, host}: {des:string, url: string, code: string, host: string}) => `
<html>
    <body>          
        <table style="width: 100%;border-spacing: 0px;background: white; padding: 0.5rem;">
            <tr>
                <th style="text-align: center; font-size: 1.5rem; margin: 1rem 0">            
                    <h2>
                        <a href="${host}" style="text-decoration: none;color: black">${data.name}</a>
                    </h2>
                </th>
            </tr>
            <tr class="link">
                <td style="text-align: center;">
                	<p style="color: #1F51FF; font-size: 2rem; letter-spacing: 1rem;"> ${code} </p>
                </td>
            </tr>
            <tr>
            <td style="text-align: center; ">
                <p>
                    If you did not request this email, please delete or ignore.
                </p> 
            </td>
            </tr>
            <tr>
                <td style="height: 50px;">
                    <footer style="margin-top: 5rem; text-align: center; padding: 0.5rem; border-top: 1px solid black">
                    Automated email <br/>
                    Please do not reply to this email. 
                    </footer>
                </td>
            </tr>
        </table>
    </body>
</html>
`