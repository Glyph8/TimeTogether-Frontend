import './TimeTableHeader.css'

const TimetableHeader = () => {
    return (
        <div className="header">
            <svg className="header-icon" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="header-title">팀 1</h1>
            <svg className="header-icon" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default TimetableHeader;