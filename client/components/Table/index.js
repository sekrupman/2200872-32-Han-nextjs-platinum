import React, {useState, useEffect} from 'react';
import { Skeleton } from 'antd';


// import component
import ModalProfile from '../ModalProfile';

// import api
import { CommunityApi } from '../../api/communityApi';

// import styles
import styles from '../../styles/LandingPage/community/table.module.css'


// use dummy data in case the server is error
const leaderList = [
    {
        id: -1,
        username: "Hansen",
        score: 270,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/100"
    },
    {
        id: -2,
        username: "Ignatius",
        score: 245,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/101"
    },
    {
        id: -3,
        username: "Difa",
        score: 150,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/102"

    },
    {
        id: -4,
        username: "Agnes",
        score: 145,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/103"
    },
    {
        id: -5,
        username: "Nour",
        score: 90,
        rank: "bronze",
        avatar: "https://source.unsplash.com/featured/104"
    }
  ];
  function Table() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedUserData, setClickedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleRowClick = (userData) => {
      setClickedUserData(userData);
      setIsModalOpen(true);
    };

    const [communityData, setCommunityData] = useState({ data: [] }); 

    useEffect(() => {
      setIsLoading(true); 
      CommunityApi()
        .then((result) => {
          if (!result) {
            setCommunityData({ data: leaderList });
          } else {
            const length = result.data.length;
            if (length < 5) {
              setCommunityData({
                data: [...result.data, ...leaderList.slice(0, 5 - length)],
              });
            } else {
              setCommunityData({ data: result.data });
            }
          }
        })
        .finally(() => setIsLoading(false));
    }, []);

    return (
      <div className={styles["table-container"]} style={{ backgroundColor: "#4E67EB", width: "800px" }}>
      <div className={styles["table-title"]}>
        <h1>SOBAT BERMAIN</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Country</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton active paragraph={false}/>
                  </td>
                  <td>
                    <Skeleton active paragraph={false}/>
                  </td>
                  <td>
                    <Skeleton active paragraph={false}/>
                  </td>
                  <td>
                    <Skeleton active paragraph={false}/>
                  </td>
                  <td>
                    <Skeleton active paragraph={false}/>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            // Render actual data
            communityData.data.map((data) => (
              <tr 
                key={data.id}
                onClick={() => handleRowClick(data)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  <img src={data.avatar} alt="" height={30} width={30}></img>
                </td>
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  {data.username}
                </td>
                <td>
                  <i className="fa fa-download mr-2 white-text" aria-hidden="true"></i>
                  {data.country}
                </td>
                <td>
                  <i className="far fa-gem mr-2 white-text" aria-hidden="true"></i>
                  {data.score}
                </td>
                <td>
                  <i className="fa fa-download mr-2 white-text" aria-hidden="true"></i>
                  {data.rank}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalOpen && clickedUserData && (
        <ModalProfile onClose={() => setIsModalOpen(false)} userData={clickedUserData} />
      )}
    </div>    
    );
}

export default Table