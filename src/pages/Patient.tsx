import { useParams } from "react-router-dom"

export default function PatientPage() {

    const { id } = useParams();

    console.log(id);

    return (
        <div></div>
    )
}
