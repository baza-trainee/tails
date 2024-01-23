// import AdoptionModal from '../../components/Modal/AdoptionModal';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

import Modal from '../ModalLayout/Modal';

import { useModalContext } from '../../context/useGlobalContext';

import ThanksModal from '../../components/ThanksModal/ThanksModal';

// import { useContext } from 'react';
// import { ModalContext } from '../../context/ModalContext';
// import { useModalContext } from '../../context/useGlobalContext';
import AdoptionModal from '../../components/AdoptionModal/AdoptionModal';
import ContactModal from '../../components/ContactModal/ContactModal';

const HomeLayout = () => {
	// const modalContext = useModalContext();
	// const isModalOpen = modalContext?.isModalOpen || false;
	// const openModal = modalContext?.openModal || (() => {});
	// const closeModal = modalContext?.closeModal || (() => {});
	const { isModalOpen, openModal, closeModal, activeModal } =
		useModalContext();
	console.log(isModalOpen);
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<Modal
				isModal={isModalOpen}
				openModal={openModal}
				closeModal={closeModal}
			>
				{activeModal === 'contact' && <ContactModal />}
				{activeModal === 'adoption' && <AdoptionModal />}
				{activeModal === 'thanks' && <ThanksModal />}
			</Modal>
			{/* <Modal
				isModal={isModalOpen}
				openModal={() => openModal('adoption')}
				closeModal={closeModal}
			>
				{activeModal === 'adoption' && <AdoptionModal />}
			</Modal> */}
			{/* <Modal
				isModal={isModalOpen}
				openModal={() => openModal('thanks')}
				closeModal={closeModal}
			>
				{activeModal === 'thanks' && <ThanksModal />}
				{/* <ThanksModal /> */}
			{/* </Modal> */} */
		</>
	);
};

export default HomeLayout;
