import Link from "next/link";
export default function labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <table>
      <tbody>
        <tr>
          <td>
            Neel Raut
          </td>
        </tr>
        <tr>
          <td>
            CS4550 Section 2
          </td>
        </tr>
      </tbody>
     </table>
     <ul>
       <li>
         <Link href="/labs/lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/labs/lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/labs/lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz</Link>
       </li>
     </ul>

     <h4>GitHub Repo Link</h4>
      Please &nbsp;
      <a href="https://github.com/neel-raut/kambaz-next-js-sp26" id="wd-github">click here</a>
      &nbsp; to visit the GitHub repository for this lab<br/>
   </div>
);}
