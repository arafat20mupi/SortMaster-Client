import { Helmet } from 'react-helmet-async';
import Banner from '../Components/Home/Banner';
import OurTeam from '../Components/Home/OurTeam';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SortMaster / Home</title>
            </Helmet>
            <Banner></Banner>
            <OurTeam></OurTeam>
        </div>
    );
};

export default Home;