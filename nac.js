// ==UserScript==
// @name         Neptun AutoCourse
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over neptun!
// @author       Chon
// @match        https://neptun-web1.kefo.hu/hallgato/main.aspx?ctrl=0303&ismenuclick=true
// @match        https://neptun-web1.kefo.hu/hallgato/main.aspx?ismenuclick=true&ctrl=0303
// @grant        none
// ==/UserScript==

//TODO: add keyboard control to start/stop loop
//TODO: add prompt input for general users (courseID => curse code from textContent)

const subjectName = "Analízis II.";
const courseId = "tr__363932950";


let wasFreeSpace = false; // because of desync

let temp = 0; //to test both branch


window.onload = () => {
    let myInterval = setInterval(() => {
        let myTimeOut1 = setTimeout(() => {
            if (!wasFreeSpace) {
                let mySelector = document.getElementsByClassName('link');
                for (let i = 0; i < mySelector.length; i++) {
                    if (mySelector[i].textContent == subjectName) {
                        mySelector[i].click();
                    }
                }

                setTimeout(() => {
                    mySelector = document.getElementById(courseId).getElementsByClassName("gridsmallcolumn")[0].textContent;
                    let numberOfPeople = mySelector.split("/");
                    console.log("Fo: "+ numberOfPeople[0] + " Varolista: " + numberOfPeople[1] + " Limit: " + numberOfPeople[2] + "\nNincs hely te retek");
                    if (numberOfPeople[0] < numberOfPeople[2] && numberOfPeople[1] < numberOfPeople[2]) {
                        wasFreeSpace = true;
                        clearInterval(myInterval);
                        clearTimeout(myTimeOut1);

                        document.getElementsByClassName("gridbutton npu_course_choice_apply")[0].click();
                        let sendMailWindow = window.open("http://localhost/mail-test/sendMail.php", "", "width=200,height=100");
                        setTimeout(() => {sendMailWindow.close();},500);
                    } else {
                        document.getElementsByName("upFunction$h_addsubjects$upModal$upmodal_subjectdata$upFootermodal_subjectdata$footerbtn_modal_subjectdata_Vissza")[0].click()

                        /*
                    //=====================================================
                    //                      TEST
                    //=====================================================
                    //else branch
                    if (temp <= 8) {
                        document.getElementsByName("upFunction$h_addsubjects$upModal$upmodal_subjectdata$upFootermodal_subjectdata$footerbtn_modal_subjectdata_Vissza")[0].click();
                    }

                    //if branch
                    if (temp > 8) {
                        if (!wasFreeSpace) {
                            clearInterval(myInterval);
                            clearTimeout(myTimeOut1);

                            document.getElementsByClassName("gridbutton npu_course_choice_apply")[0].click();
                            let sendMailWindow = window.open("http://localhost/mail-test/sendMail.php", "", "width=200,height=100");
                            setTimeout(() => {sendMailWindow.close();},500);
                        }
                        wasFreeSpace = true;
                    }
                    console.log(temp++);
                    //=====================================================
                    */
                    }

                }, 1000);
            }
        }, 2000);
    }, 3000);
};
