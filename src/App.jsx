import React, { useState } from 'react';
import './App.css';
import achievementsData from './assets/data/achievements.json';
import coordinatesData from './assets/data/coordinates.json';
import tiersData from './assets/data/tiers.json';

const SideMenu = ({ selectedTier, setSelectedTier }) => (
  <div className="side-menu">
    <ul>
      <li className="menu-category">---Logros---</li>
      {tiersData.tiers.slice(0, 5).map((tier) => (
        <li
          key={tier.value}
          className={`tier-item ${selectedTier === tier.value ? "active" : ""}`}
          onClick={() => setSelectedTier(tier.value)}
        >
          <img src={tier.icon} alt={tier.name} className="tier-icon" />
          <span>{tier.name}</span>
        </li>
      ))}
      <li className="menu-category">---Otros---</li>
      <li className={`tier-item ${selectedTier === "coordenadas" ? "active" : ""}`} onClick={() => setSelectedTier("coordenadas")}>
        <img src="https://mcicons.ccleaf.com/assets/10.%20Items/18.%20Consumables/Filled_Map.png" alt="coordenadas" className="tier-icon" />
        Coordenadas
      </li>
    </ul>
  </div>
);

const AchievementList = ({ achievements }) => (
  <div className="achievements-list">
    {achievements.length > 0 ? (
      achievements.map((ach, index) => (
        <div key={index} className={`achievement-item achievement-${ach.tier}`} >
          <div className="achievement-header">
            <img src={ach.iconUrl} alt={ach.name} className="achievement-icon" />
            <p className="achievement-name">{ach.name}</p>
          </div>
          <p className="achievement-description">{ach.description}</p>
          <div className="additional-icons">
            {ach.additionalIcons.map((additionIcon) => (
                <div className="additional-block-div">
                  <img src={additionIcon.icon} className="additional-icon"></img>
                  <p className="quantity-label">{additionIcon.quantity}</p>
                </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No hay logros en este tier.</p>
    )}
  </div>
);

const CoordinatesList = ({ coordinates }) => (
  <div className="coordinates-list">
    {coordinates.map((coord, index) => (
      <div key={index} className="coordinate-item">
        <img src={coord.iconUrl} alt={coord.name} className="coordinate-icon" />
        <p className="coordinate-name">{coord.name}&nbsp;</p>
        <div>

          <p className="coordinate-description">{coord.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const App = () => {
  const [selectedTier, setSelectedTier] = useState(0);
  const filteredAchievements = achievementsData.achievements.filter(ach => ach.tier === selectedTier);

  return (
    <div className="App">
      <header className="title-container">
        <img src="/title-image.png" alt="Minecraft Hardcore Tracker" className="title-image" />
      </header>
      <SideMenu selectedTier={selectedTier} setSelectedTier={setSelectedTier} />
      <div className="content">
        {selectedTier === "coordenadas" ? <CoordinatesList coordinates={coordinatesData.coordinates} /> : <AchievementList achievements={filteredAchievements} />}
      </div>
    </div>
  );
};

export default App;
