import type { ISubmitButtonProp } from "../../interfaces/ButtonProps";
import cl from './SubmitButton.module.css'

function SubmitButton(prop: ISubmitButtonProp) {
    return ( 
        <button
         className={cl.submitButton}
         onClick={prop.onClick}
         type="submit">
            {prop.text}
        </button>
     );
}

export default SubmitButton;