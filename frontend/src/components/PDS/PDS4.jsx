import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print'




 

const PDS4 = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState(""); // State for employee number


      useEffect(() => {
      
        const storedRole = localStorage.getItem('role');
        const storedEmployeeNumber = localStorage.getItem('employeeNumber');
    
    
        console.log("Stored Role:", storedRole);
        console.log("Stored Employee Number:", storedEmployeeNumber);
    
    
        if (storedRole && storedEmployeeNumber) {
          
          setRole(storedRole);
          setEmployeeNumber(storedEmployeeNumber);
        } else {
          // Navigate to login if values are missing
          navigate("/");
        }
    
    
      }, [navigate]);

    return (

      <div id="print-section">

     <style>
  {`
    @media print {
      html, body {
        background: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        margin: 0;
        padding: 0;
        .no-print {
        display: none !important;
        height: 100vh;
        overflow: hidden;
        }
      }


      body * {
        visibility: hidden;
      }


      #print-section, #print-section * {
        visibility: visible;
      }


      #print-section {
        position: absolute;
        left: 0;
        top: 0;
        width: fit-content;
        margin: 0;
        margin-bottom: 0;
        padding: 0;
        background-color: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        transform: scale(1);
        transform-origin: center;
        page-break-inside: avoid;
        break-inside: avoid;
      }


      .print-button {
        display: none;
      }


      @page {
        size: legal portrait;
        margin: 0;
      }
    }
  `}
</style>


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
        <div style={{ overflow: 'hidden', padding: '0.25in', width: '8in', height: 'fit-content' }}>
        <thead>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '8in', tableLayout: 'fixed', marginTop: '-5px' }}>
                  <tbody>
                        <tr>
                            <td colSpan="12"style={{height:'1.1in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                34.&emsp;&emsp;Are you related by consanguinity or affinity to the appointing or recommending authority, or to the<br></br>
                                &emsp;&emsp;&emsp; chief of bureau or office or to the person who has immediate supervision over you in the Office,<br></br>
                                &emsp;&emsp;&emsp; Bureau or Department where you will be apppointed,<br></br>
                                <br></br>
                                &emsp;&emsp;&emsp; a. within the third degree?<br></br>
                                <br></br>
                                &emsp;&emsp;&emsp; b. within the fourth degree (for Local Government Unit - Career Employees)?<br></br>
                                <br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'1.1in', fontSize:'62.5%', border: '1px solid black'}}>
                                <br></br>
                                <br></br>
                                <br></br>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No

                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                &emsp;&emsp;If YES, give details:<br></br>
                                &emsp;&emsp;_________________________<br></br>
                                <br></br>
                            </td>      
                        </tr>
                       
                        <tr>
                            <td colSpan="12" rowSpan= "2" style={{height:'1.5in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                35.&emsp;&emsp;a. Have you ever been found guilty of any administrative offense?<br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;    b. Have you been criminally charged before any court?<br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'0.75in', fontSize:'62.5%', border: '1px solid black'}}>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br />
                                <br></br>
                                &emsp;&emsp;If YES, give details:<br></br>
                                &emsp;&emsp;_________________________
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="6"style={{height:'0.85in', fontSize:'62.5%', border: '1px solid black'}}>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br />
                                <br />
                                &emsp;&emsp;If YES, give details:<br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;&emsp;&emsp;Date Filed: _____________<br></br>
                                &emsp;&emsp;Status of Case/s: _____________        
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="12"style={{height:'0.6in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                <br></br>
                                36.&emsp;&emsp;Have you ever been convicted of any crime or violation of any law, decree, ordinance or<br></br>
                                &emsp;&emsp;&emsp; regulation by any court or tribunal?
                                <br></br>
                                <br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'0.6in', fontSize:'62.5%', border: '1px solid black'}}>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br></br>
                                <br />
                                &emsp;&emsp;If YES, give details:<br></br>
                                &emsp;&emsp;_________________________
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="12"style={{height:'0.6in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                <br></br>
                                37.&emsp;&emsp;Have you ever been separated from the service in any of the following modes: resignation,<br></br>
                                &emsp;&emsp;&emsp; retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased<br></br>
                                &emsp;&emsp;&emsp; out (abolition) in the public or private sector?<br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'0.6in', fontSize:'62.5%', border: '1px solid black'}}>
                              
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br />
                                <br></br>
                                &emsp;&emsp;If YES, give details:<br></br>
                                &emsp;&emsp;_________________________
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="12"style={{height:'1.05in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                38.&emsp;&emsp;a. Have you ever been a candidate in a national or local election held within the last year (except<br></br>
                                &emsp;&emsp;&emsp; Barangay election)?<br></br>
                                <br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;  b. Have you resigned from the government service during the three (3)-month period before the<br></br>
                                &emsp;&emsp;&emsp; last election to promote/actively campaign for a national or local candidate?<br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'1.1in', fontSize:'62.5%', border: '1px solid black'}}>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br></br>
                                <br></br>
                                &emsp;&emsp;If YES, give details:  _____________________<br></br>
                                <br />
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br></br>
                                <br></br>
                                &emsp;&emsp;If YES, give details:  _____________________<br></br>
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="12"style={{height:'0.6in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                                <br></br>
                                39.&emsp;&emsp;Have you acquired the status of an immigrant or permanent resident of another country?<br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'0.6in', fontSize:'62.5%', border: '1px solid black'}}>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br></br>
                                <br />
                                &emsp;&emsp;If YES, give details (country):<br></br>
                                &emsp;&emsp;_________________________
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="12"style={{height: '1in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black' }}>
                                40. &emsp; &emsp; Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA <br></br>
                                &emsp;&emsp;&emsp; 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:<br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;  a. Are you a member of any indigenous group?<br></br>
                                <br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;  b. Are you a person with disability?<br></br>
                                <br></br>
                                <br></br>
                                &emsp;&emsp;&emsp;  c. Are you a solo parent?<br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </td>
                            <td colSpan="6"style={{height:'1.1in', fontSize:'62.5%', border: '1px solid black'}}>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br />
                                <br />
                                &emsp;&emsp;If YES, please specify:  _____________________<br></br>
                                <br></br>
                                <br></br>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br></br>
                                &emsp;&emsp;If YES, please specify ID No:&emsp;&emsp;____________<br></br>
                                <br></br>
                                <br></br>
                                &emsp; <input type="checkbox" name="q34_a_yes" /> Yes   &emsp; <input type="checkbox" name="q34_a_no" /> No
                                <br />
                                &emsp;&emsp;If YES, please specify Id No:&emsp;&emsp;____________<br></br>
                                <br></br>
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="14"style={{ height: '0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                            41.&emsp;&emsp; REFERENCES <span style={{ color: 'red' }}>
                                    (Person not related by consanguinity or affinity to applicant/appointee)
                                </span>
                            </td>
                            <td colSpan="4" rowspan="6" style={{height:'0.1.1in', fontSize:'62.5%', border:'1px 1px 0px 1px solid black', textAlign:'center'}}>
                               {/* <div style={{border:'1px solid black', width:'3.5cm', height:'4.5cm', position:'absolute', top: '113.75%', left: '45%', textAlign:'center'}}>
                                    <br></br>
                                    ID picture taken within<br></br>
                                    the last 6 months<br></br>
                                    4.5 cm. X 3.5 cm<br></br>
                                    (passport size)<br></br>
                                    <br></br>
                                    <br></br>
                                    Computer generated<br></br>
                                    or photocopied picture<br></br>
                                    is not acceptable
                                </div> */}
                                <div style={{border:'1px solid black', width:'3.5cm', height:'4.5cm', position: 'relative', left: '17.5px', top: '7.5px', textAlign:'center'}}>
                                    <br></br>
                                    ID picture taken within<br></br>
                                    the last 6 months<br></br>
                                    4.5 cm. X 3.5 cm<br></br>
                                    (passport size)<br></br>
                                    <br></br>
                                    <br></br>
                                    Computer generated<br></br>
                                    or photocopied picture<br></br>
                                    is not acceptable
                                </div>
                                <br></br>
                                PHOTO<br></br>
                                <br></br>
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="7"style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                NAME
                            </td>  
                            <td colSpan="5"style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                ADDRESS
                            </td>  
                            <td colSpan="2"style={{height:'0.25in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                TEL. NO.
                            </td>      
                        </tr>
                        <tr>
                            <td colSpan="7"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="5"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="2"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="5"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="2"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="5"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="2"style={{height:'0.25in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="14"style={{height:'0.6in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black'}}>
                            42.&emsp;&emsp;I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and<br></br>
                            &emsp;&emsp;&emsp; complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the<br></br>
                            &emsp;&emsp;&emsp; Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein.<br></br>
                            &emsp;&emsp;&emsp; I agree that any misrepresentation made in this document and its attachments shall cause the filing of<br></br>
                            &emsp;&emsp;&emsp; administrative/criminal case/s against me.
                            </td>  
                        </tr>
                        <tr>
                            <td colSpan="18"style={{height: '1.50in', fontSize: '50%', border: '0px 1px 0px 1px solid black'}}>
                                <div style={{position: 'relative', top: '0.06in', left: '0.1.1in', float: 'left'}}>
                                    <table style={{border:'1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '2.9in', height: '1.1in', tableLayout: 'fixed'}}>
                                        <tr>
                                            <td style={{height: '0.35in', fontSize: '47.5', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                                Government Issued ID (i.e.Passport, GSIS, SSS, PRC, Driver's<br></br>
                                                License, etc.) PLEASE INDICATE ID Number and Date of Issuance
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height:'0.25in', fontSize:'58%', border: '1px solid black'}}>
                                            &emsp;Government Issued ID:
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height:'0.25in', fontSize:'58%', border: '1px solid black'}}>
                                            &emsp;ID/License/Passport No:
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style={{height:'0.25in', fontSize:'58%', border: '1px solid black'}}>
                                            &emsp;Date/Place of Issuance:
                                        </td>
                                       
                                        </tr>
                                       
                                    </table>
                                </div>
                               
                           
                        <div style={{position:'relative', top: '0.08in', left: '0.3in', float: 'left'}}>
                                    <table style={{border:'1px solid black', borderCollapse:'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '2.9in', height: '1.1in', tableLayout: 'fixed'}}>
                                        <tr>
                                            <td style={{height:'0.6in', fontSize:'58%', border: '1px solid black', textAlign:'center'}}>
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height:'0.1.1in', fontSize:'58%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                                Signature (Sign inside the box)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height: '0.2in', fontSize:'58%', border: '1px solid black'}}>
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height:'0.1.1in', fontSize:'58%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                                Date Accomplished
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                               
                                <div style={{position:'relative', top: '-0.05in', left: '-0.15in', float: 'right'}}>
                                    <table style={{border:'1px solid black', borderCollapse:'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '1.5in', height: '1.1in', tableLayout: 'fixed'}}>
                                        <tr>
                                            <td style={{height:'1.1in', fontSize:'58%', border: '1px solid black', textAlign:'center'}}>
                                                &nbsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{height: '0.2in', fontSize:'58%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                                Right Thumbmark
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="18"style={{height: '1px', fontSize: '0%', backgroundColor:'black', border: '0px solid white'}}>            
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="18"style={{height:' 0.2in', fontSize:'62.5%', border:'1px 1px 0px 1px solid black', textAlign:'center'}}>
                            <br></br>
                            SUBSCRIBED AND SWORN to before me this ____________ , affiant exhibiting his/her validly issued government ID as indicated above.<br></br>
                            <br></br>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" rowspan="3"style={{height:' 1in', fontSize:'62.5%', border: '0px 1px 1px 1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="6"style={{height:'0.6in', fontSize:'62.5%', border: '1px solid black'}}>
                                &nbsp;
                            </td>
                            <td colSpan="6" rowspan="3"style={{height:'0.6in', fontSize:'62.5%', border: '0px 1px 1px 1px solid black'}}>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6"style={{height:'0.1.1in', fontSize:'62.5%', backgroundColor:'lightgray', border: '1px solid black', textAlign:'center'}}>
                                Person Administering Oath
                            </td>  
                        </tr>
                        <tr>
                            <td colSpan="6"style={{height:'0.1.1in', fontSize:'62.5%', border: '1px solid white', textAlign:'center'}}>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="18" style={{height:'1px', fontSize:'0%', backgroundColor: 'black', border:'0px solid white'}}>
                            &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="18"style={{height:'0.1.1in', fontSize: '50%', border: '1px solid white', textAlign: 'right'}}>
                            <i>CS FORM 212 (Revised 2017), Page 4 of 4</i>
                            </td>
                        </tr>  




                       








                               


                       


                       


                       




























                       
                                       
                                       
                                       
                        </tbody>
                    </table>
                </thead>
            </div>
        </div>
        <button
            onClick={() => window.print()}
            className="no-print"
            style={{
            backgroundColor: '#6D2323',
            color: '#FFFFFF',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '14px',  
            marginLeft: '80%',
            marginBottom: '30px'
            }}
            >
            <PrintIcon style={{ fontSize: '24px' }} />
                Save / Print
            </button>
      </div>


);


};




export default PDS4;

