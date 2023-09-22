import "./DropdownItem.css";

function DropdownItem(props: any): JSX.Element {
    return (
        <li className="DropdownItem">
            <p>{props.icon}</p>
            <a>{props.text}</a>
        </li>
    );
}

export default DropdownItem;
