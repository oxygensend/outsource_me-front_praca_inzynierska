import {memo, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import tokenService from "../../services/tokenService";
import profileService from "../../services/profileService";
import {SERVER_URL} from "../../config";
import accountType from "../../translations/accountType";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";
import mail from "../../assets/icons/mail.svg";
import edit_icon from "../../assets/icons/edit-icon.png";
import {Languages} from "./Languages";
import {JobPositions} from "./JobPosition";
import {Education} from "./Education";
import {Technologies} from "./Technologies";

export const ProfilePage = memo(({style, setShowModals}) => {

    const [personalData, setPersonalData] = useState();
    const {id} = useParams();
    const DEVELOPER_ROLE = 'Developer';
    const PRINCIPLE_ROLE = 'Principle';
    const checkIfMe = tokenService.checkIfMe(id);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [languages, setLanguages] = useState();


    useEffect(() => {
        return () => {
            getPersonalData();
            getLanguages();
        };
    }, []);



    const getPersonalData = () => {
        profileService.getPersonalData(id)
            .then(response => {
                if (response.status === 200) {
                    setPersonalData(response.data)
                }
            }).catch(err => {

            console.log(err);
        });
    }

    const getLanguages = () => {
        profileService.getLanguages('1')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setLanguages(response.data['hydra:member']);
                }
            }).catch(err => {

            console.log(err);
        });
    }
    const getTechnologies = () => {
        profileService.getTechnologies(id)
            .then(response => {
                if (response.status === 200) {
                }
            }).catch(err => {

            console.log(err);
        });
    }

    console.log(languages);

    /**
     * Personal data have to be rendered first
     */
    if (personalData)
        return (
            <div className={"profile-container "} style={style}>
                <div className={"col-span-full grid grid-cols-10"}>
                    <div className={"md:col-start-2 md:col-span-4 col-start-2 col-span-6 mt-10"}>

                        <img src={SERVER_URL + '/' + personalData.imagePath} width={120} height={120}
                             className={"rounded-2xl border-2  "} alt={"avatar"}/>

                        <p className={"profile-fullname mt-2"}>{personalData.fullName}</p>
                        <p className={" gray-font"}>{accountType(personalData.accountType)}</p>
                        {personalData.address ?
                            <p className={"only-for-small-media gray-font2 italic"}>{personalData.address.city}</p>
                            : null}


                        <div className={"flex flex-row gap-3 mt-2 items-center"}>
                            {personalData.githubUrl ?
                                <img src={github}
                                     alt={"github"}
                                     className={"cursor-pointer"}
                                     onClick={() => window.location.href = personalData.githubUrl}/>
                                : null}
                            {personalData.linkedinUrl ?
                                <img src={linkedin}
                                     alt={"linkedin"}
                                     className={"cursor-pointer"}
                                     onClick={() => window.location.href = personalData.linkedinUrl}/>
                                : null}
                            {checkIfMe ? null :
                                <img className={"only-for-small-media cursor-pointer"}
                                     src={mail}
                                     alt={"mail"}
                                     width={16}
                                     height={16}
                                />
                            }
                        </div>

                    </div>
                    <div className={" col-start-8 col-span-2 "}>
                        <div className={"relative flex flex-col gap-4 cursor-pointer"} style={{top: '75%'}}>
                            <div>
                                <p className={"red-font"}>43 Opinie</p>
                            </div>
                            <div>
                                {personalData.address ?
                                    <p className={"gray-font2 italic only-for-big-media "}>{personalData.address.city}</p>
                                    : null}
                                {checkIfMe ? null :
                                    <div className={"flex flex-row gap-2  only-for-big-media cursor-pointer"}>
                                        <img src={mail} alt={"mail"} width={16} height={16}/>
                                        <p className={"red-font "}>Skontaktuj się</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {checkIfMe ?
                        <div className={"col-end-11 mt-10 row-span-0"}>
                            <img src={edit_icon} alt={"edit"}/>
                        </div> : null
                    }

                    <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                </div>
                <div className={"col-span-full grid grid-cols-10 mt-5"}>
                    <div className={"col-start-2 col-end-10"}>
                        <p className={"font-module pb-2"}>O mnie</p>
                        <p className={"italic pl-1 mt-5"}>{personalData.description ?? 'Brak opisu.'}</p>
                    </div>
                    <hr className={"col-span-full mt-10 "} style={{backgroundColor: "#0F528B", opacity: "0.8"}}/>
                </div>

                <Languages id={personalData.id} languages={languages}  setShowModals={setShowModals}/>
                <JobPositions id={personalData.id} setShowModals={setShowModals}/>
                <Education id={personalData.id} setShowModals={setShowModals}/>

                {personalData.accountType === DEVELOPER_ROLE ?
                    <Technologies
                        personalData={personalData}
                        setShowModals={setShowModals}
                    />
                    : null}

            </div>

        );
    else
        return null;
});