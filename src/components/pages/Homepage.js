import React, {useEffect, useState} from 'react';
import LoginModal from "../modal/LoginModal";
import "../static/index.css"
import ajax from "../utils/FetchService";
import ItemCard from "../card/ItemCard";
import {Container} from "react-bootstrap";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import Footer from "../footer/Footer";
import {useNavigate} from "react-router-dom";
import {useUser} from "../utils/userProvider/UserProvider";
import {motion} from "framer-motion";
import Navbar from "../navbar/Navbar";

const Homepage = () => {

    const navigate = useNavigate();
    const user = useUser();
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [content, setContent] = useState([]);

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isOpacity, setOpacity] = useState(false);

    function handleScroll() {
        const windowScrollTop = window.scrollY;

        if (windowScrollTop > 100) {
            setOpacity(true)

        } else {
            setOpacity(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    useEffect(() => {
        if (fetching) {
            ajax(`/api/auth/main/paging?page=${currentPage}&limit=8`, "GET", user.jwt).then((contentsData) => {
                setContent([...content, ...contentsData])
                setCurrentPage(prevState => prevState + 1);
            }).finally(() => setFetching(false));
        }
    }, [fetching]);


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }

    }, []);

    const scrollHandler = (e) => {
        const windowScrollTop = window.scrollY;
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
            setFetching(true);

    };

    return (
        <div className="background-image">
            <div style={{height: '200px'}}>
                <motion.div
                    initial={{ opacity: isOpacity ? 1 : 0, scale: 0.5 }}
                    animate={{ opacity: isOpacity ? 0 : 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}>
                <Navbar show={show} handleClose={handleClose} handleShow={handleShow}/>
                </motion.div>
            </div>
            <div>
                <Container>
                    <MDBRow className="d-flex flex-column">
                        {content.map((con)=> (
                            <MDBCol key={con.id} className='d-flex justify-content-center mb-5 d-block align-items-center'>
                                <ItemCard content={con}/>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </Container>
            </div>
            <div>
                <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
            </div>
            <Footer/>
        </div>
    );
};

export default Homepage;
