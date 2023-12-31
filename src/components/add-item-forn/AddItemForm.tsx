import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    console.log('AddItemForm')

    const [title, setTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        props.callBack(title)
        setTitle('')
    }

    return (
        <div>
            <input value={title} onChange={onChangeInputHandler} type="text"/>
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

export default AddItemForm;