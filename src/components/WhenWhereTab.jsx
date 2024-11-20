import {useNavigate} from "react-router-dom";

const WhenWhereTab = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    return (
        <div className="tab-container">
            <button
                className={`tab-button ${activeTab === 'when' ? 'active' : ''}`}
                onClick={() => {
                    setActiveTab('when');
                    // navigate('group/when');
                }
            }
            >
                언제
            </button>
            <button
                className={`tab-button ${activeTab === 'where' ? 'active' : ''}`}
                onClick={() => setActiveTab('where')}
            >
                어디서
            </button>
        </div>
    );
};
export default WhenWhereTab;