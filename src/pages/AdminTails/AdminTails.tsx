import styles from '../AdminPhotos/AdminPhotos.module.scss';
import Button from '../../layout/Button/Button';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { scrollOnTop } from '../../services/scrollTo';
import { fetchTails } from '../../services/fetchAdminTails';
import TailsList from './TailsList';
import TailForm from './TailForm';
import { FaRegPlusSquare } from 'react-icons/fa';
import { useAuthContext } from '../../context/useGlobalContext';


export interface TailsListData {
	id: number;
	name: string;
	name_en?: string;
	ready_for_adoption: boolean;
	gender: string;
	gender_en?: string;
	age: string;
	age_en?: string;
	sterilization?: boolean;
	vaccination_parasite_treatment?: boolean;
	size: string;
	size_en?: string;
	description: string;
	description_en?: string;
	photo?: {
		id: string;
		name: string;
		url: string;
		category: string;
	};
}


export type AdminTailsData = TailsListData[];


const AdminTails = () => {
	const [showForm, setShowForm] = useState<boolean>(false);
	const [formType, setFormType] = useState<string>('');
	const [dogId, setDogId] = useState<undefined | number>(null);
	const location = useLocation();
	const { token } = useAuthContext();

	const data = useQuery<AdminTailsData>({
		queryKey: ['tailslist'],
		queryFn: () => typeof token === 'string' ? fetchTails(token) : Promise.resolve([]),
		retry: 1,
		enabled: !!token,
	});

	const [cards, setCards] = useState<TailsListData[]>([]);
	const { data: tails, isPending, isError } = data;


	useEffect(() => {
		location.pathname === '/' && !location.hash ? scrollOnTop() : null;
	}, [location]);

	useEffect(() => {
		if (tails) {
			setCards(tails);
		}

	}, [tails]);

	const handleShowForm = (formStatus: boolean, type: string, id?: number) => {
		setShowForm(formStatus);
		setFormType(type);
		setDogId(id);
		scrollOnTop();
	};


	return (
		<div
			className={styles.container}>
			<div>
				<h2 className={styles.title}>
					Хвостики
				</h2>
			</div>


			<div>
				{showForm ? (
						<TailForm cards={cards} dogId={dogId} formType={formType} changeShowForm={handleShowForm} />)
					: (
						<div className={styles.buttonsWrapper}>
							<div>
								<Button
									onClick={() => handleShowForm(true, 'add')}
									type={'button'}
									btnClasses={'add'} name={'Додати Хвостика'} children={<FaRegPlusSquare />} />
							</div>
						</div>
					)}


			</div>


			<TailsList cards={cards} isPending={isPending} isError={isError} changeShowForm={handleShowForm}
					   data={data} />


		</div>

	);
};

export default AdminTails;
