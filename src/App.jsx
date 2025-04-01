import React, { useState } from 'react';
import './App.css';

const tiers = [
  { name: "Nivel Comun", value: 0, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Wooden_Sword.png" },
  { name: "Nivel Raro", value: 1, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Stone_Sword.png" },
  { name: "Nivel Epico", value: 2, icon: "https://mcicons.ccleaf.com/thumbnails/10.%20Items/1.%20Swords/Iron_Sword.png" },
  { name: "Nivel Legendario", value: 3, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Diamond_Sword.png" },
  { name: "Nivel Mítico", value: 4, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Netherite_Sword.png" },
  { name: "Coordenadas", value: "coordenadas", icon: "https://mcicons.ccleaf.com/assets/10.%20Items/18.%20Consumables/Filled_Map.png" }
];

const achievementsData = [
  { name: 'Primer paso', tier: 0, iconUrl: 'https://mcicons.ccleaf.com/assets/20.%20Blocks/07.%20Logs/Oak_Log.png', description: 'Completa el primer día en el mundo de Minecraft.', completed: false, additionalIcons: ['🛏️', '🌞'] },
  { name: 'Cazador experto', tier: 1, iconUrl: 'https://mcicons.ccleaf.com/icons/achievement2.png', description: 'Caza y elimina 10 mobs diferentes.', completed: false, additionalIcons: ['⚔️', '💀'] },
  { name: 'Maestro constructor', tier: 2, iconUrl: 'https://mcicons.ccleaf.com/icons/achievement3.png', description: 'Construye una estructura gigante en el mundo.', completed: false, additionalIcons: ['🏗️', '🧱'] },
];

const coordinatesData = [
  { name: 'Base Principal', iconUrl: 'https://mcicons.ccleaf.com/assets/17.$%20Structures/10.%20Villages/Plains_Small_House_3.png', description: 'X: 300, Y: ~, Z: 1900'},
  { name: 'Mina Principal', iconUrl: 'https://mcicons.ccleaf.com/assets/10.%20Items/3.%20Tools/Iron_Pickaxe.png', description: 'X: -50, Y: 11, Z: -100'},
  { name: 'Portal Nether', iconUrl: 'https://mcicons.ccleaf.com/assets/20.%20Blocks/08.%20Obsidian/Obsidian.png', description: 'X: 20, Y: 70, Z: 150'},
  { name: 'Fortaleza del Nether', iconUrl: 'https://mcicons.ccleaf.com/assets/10.%20Items/18.%20Consumables/Netherrack.png', description: 'X: -200, Y: 65, Z: 300'},
  { name: 'Portal al End', iconUrl: 'https://mcicons.ccleaf.com/assets/10.%20Items/18.%20Consumables/Eye_of_Ender.png', description: 'X: 500, Y: 40, Z: -250'}
];

const getTierStyle = (tier) => {
  const styles = [
    { backgroundColor: '#E1E1E1', borderColor: '#888' },
    { backgroundColor: '#FFEB3B', borderColor: '#FBC02D' },
    { backgroundColor: '#4CAF50', borderColor: '#388E3C' },
    { backgroundColor: '#2196F3', borderColor: '#1976D2' },
    { backgroundColor: '#9C27B0', borderColor: '#7B1FA2' },
  ];
  return styles[tier] || {};
};

const SideMenu = ({ selectedTier, setSelectedTier }) => (
  <div className="side-menu">
    <ul>
      <li className="menu-category">---Logros---</li>
      {tiers.slice(0, 5).map((tier) => (
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
        <div key={index} className="achievement-item" style={getTierStyle(ach.tier)}>
          <div className="achievement-header">
            <img src={ach.iconUrl} alt={ach.name} className="achievement-icon" />
            <p className="achievement-name">{ach.name}</p>
          </div>
          <p className="achievement-description">{ach.description}</p>
          <div className="additional-icons">
            {ach.additionalIcons.map((icon, idx) => (
              <span key={idx} className="additional-icon">{icon}</span>
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
  const filteredAchievements = achievementsData.filter(ach => ach.tier === selectedTier);

  return (
    <div className="App">
      <header className="title-container">
        <img src="/title-image.png" alt="Minecraft Hardcore Tracker" className="title-image" />
      </header>
      <SideMenu selectedTier={selectedTier} setSelectedTier={setSelectedTier} />
      <div className="content">
        {selectedTier === "coordenadas" ? <CoordinatesList coordinates={coordinatesData} /> : <AchievementList achievements={filteredAchievements} />}
      </div>
    </div>
  );
};

export default App;
