import "./AddReply.css";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

interface AddReplyProps {
    authorFullName: string;  // Define the expected prop and its type
}

function AddReply(props: AddReplyProps): JSX.Element {
    return (
        <div className="AddReply">
            <p> <SubdirectoryArrowRightIcon /> Reply to: {props.authorFullName}</p>

            <div className="reply-container">
                <textarea placeholder="reply..."></textarea>
                <button>Send</button>
            </div>

        </div>


    );
}

export default AddReply;
