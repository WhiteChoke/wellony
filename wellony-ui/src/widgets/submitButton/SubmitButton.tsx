import type { ISubmitButtonProp } from "../../entities/ButtonProps.ts";
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