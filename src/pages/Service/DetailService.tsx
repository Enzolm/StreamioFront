import { useParams } from "react-router-dom";

function DetailService() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Detail Service : {id}</h1>
    </div>
  );
}

export default DetailService;
