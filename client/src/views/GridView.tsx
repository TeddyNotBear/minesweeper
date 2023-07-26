import { useParams } from 'react-router-dom';
import GridComponent from '../components/GridComponent';

function GridView() {
    // const { player_id, grid_id } = useParams();

    return (
        <div className="flex justify-center items-center h-screen">
            <GridComponent />
        </div>
    );
}

export default GridView;

