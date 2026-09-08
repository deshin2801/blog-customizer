import { useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

interface ArticleParamsFormProps {
	setArticleStyleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setArticleStyleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [inputArticleStyleState, setInputArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleStyleState(inputArticleStyleState);
		setIsOpen(false);
	};

	const resetForm = () => {
		setInputArticleStyleState(defaultArticleState);
		setArticleStyleState(defaultArticleState);
		setIsOpen(false);
	};

	const onOptionSelected =
		(optionName: keyof ArticleStateType) =>
		(selected: OptionType): void => {
			setInputArticleStyleState((prev) => ({
				...prev,
				[optionName]: selected,
			}));
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			<aside className={isOpen ? styles.container_open : styles.container}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text>Задайте параметры</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={inputArticleStyleState.fontFamilyOption}
						onChange={onOptionSelected('fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={inputArticleStyleState.fontSizeOption}
						onChange={onOptionSelected('fontSizeOption')}
						key='font-size-group'
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputArticleStyleState.fontColor}
						onChange={onOptionSelected('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputArticleStyleState.backgroundColor}
						onChange={onOptionSelected('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputArticleStyleState.contentWidth}
						onChange={onOptionSelected('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={resetForm} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
