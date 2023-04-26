import "../css/FooterGlobal.css";

export const FooterGlobal = () => {    
    return (
    
        <div className="footerGlobal">
        <div className="row footerSectionOne">
            <div className="col">
                <small> Exam project by Helena Løkkeberg</small>
            </div>
        </div>
        <div className="row footerSectionTwo">
            <div className="col">
                <small>
                    Deployed with Githup Pages
                </small>
            </div>
            <div className="col">
                <small><a href="https://github.com/hhummus/" target="_blank" rel="noreferrer" className="visitMyGit"> visit my github</a></small>
            </div>

        </div>

        </div>
       

    );
};
export default FooterGlobal;