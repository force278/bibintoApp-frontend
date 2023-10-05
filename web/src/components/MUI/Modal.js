import { Box, Icon, Modal, Typography } from "@mui/material";
import styles from "./Modal.module.scss"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#FEF0F0',
    boxShadow: 24,
    outline: 'none',
    p: 4,
    '&:focus': {
        border: 'none'
    }
};


export function ModalMUI({photo, liked}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div onClick={handleOpen} style={{cursor: 'pointer'}}>
                <Icon>
                    <FontAwesomeIcon icon={faLightbulb}/>
                </Icon>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div>
                        <img className={styles.imageModal} src={photo} alt='' />
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Общее число лайков: <FontAwesomeIcon icon={SolidHeart} style={{color: '#F0355B',}} /> {liked}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}