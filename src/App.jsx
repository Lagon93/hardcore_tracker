import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Estado para el tier seleccionado
  const [selectedTier, setSelectedTier] = useState(0);
  const [achievements, setAchievements] = useState([
    { 
      name: 'Primer paso', 
      tier: 0, 
      iconUrl: 'https://mcicons.ccleaf.com/assets/20.%20Blocks/07.%20Logs/Oak_Log.png', 
      description: 'Completa el primer día en el mundo de Minecraft.', 
      completed: false, 
      additionalIcons: ['🛏️', '🌞']
    },
    { 
      name: 'Primer paso', 
      tier: 0, 
      iconUrl: 'https://mcicons.ccleaf.com/assets/20.%20Blocks/07.%20Logs/Oak_Log.png', 
      description: 'Completa el primer día en el mundo de Minecraft.', 
      completed: false, 
      additionalIcons: ['🛏️', '🌞']
    },
    { 
      name: 'Cazador experto', 
      tier: 1, 
      iconUrl: 'https://mcicons.ccleaf.com/icons/achievement2.png', 
      description: 'Caza y elimina 10 mobs diferentes.', 
      completed: false, 
      additionalIcons: ['⚔️', '💀']
    },
    { 
      name: 'Maestro constructor', 
      tier: 2, 
      iconUrl: 'https://mcicons.ccleaf.com/icons/achievement3.png', 
      description: 'Construye una estructura gigante en el mundo.', 
      completed: false, 
      additionalIcons: ['🏗️', '🧱']
    },
    { 
      name: 'Explorador legendario', 
      tier: 3, 
      iconUrl: 'https://mcicons.ccleaf.com/icons/achievement4.png', 
      description: 'Explora todos los biomas del mundo de Minecraft.', 
      completed: false, 
      additionalIcons: ['🌍', '🗺️']
    },
    { 
      name: 'Inmortal', 
      tier: 4, 
      iconUrl: 'https://mcicons.ccleaf.com/icons/achievement5.png', 
      description: 'Sobrevive durante 100 días sin morir en el modo Hardcore.', 
      completed: false, 
      additionalIcons: ['💪', '⏳']
    },
  ]);

  // Datos de los tiers
  const tiers = [
    { name: "Nivel Comun", value: 0, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Wooden_Sword.png" },
    { name: "Nivel Raro", value: 1, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Stone_Sword.png" },
    { name: "Nivel Epico", value: 2, icon: "https://mcicons.ccleaf.com/thumbnails/10.%20Items/1.%20Swords/Iron_Sword.png" },
    { name: "Nivel Legendario", value: 3, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Diamond_Sword.png" },
    { name: "Nivel Mítico", value: 4, icon: "https://mcicons.ccleaf.com/assets/10.%20Items/1.%20Swords/Netherite_Sword.png" },
  ];

  // Cambiar tier seleccionado
  const handleTierClick = (tierValue) => {
    setSelectedTier(tierValue);
  };

  // Cambiar estado de un logro
  const toggleCompletion = (index) => {
    setAchievements((prevAchievements) => {
      return prevAchievements.map((ach, i) => 
        i === index ? { ...ach, completed: !ach.completed } : ach
      );
    });
  };

  // Función para obtener el estilo de cada tier
  const getTierStyle = (tier) => {
    switch (tier) {
      case 0:
        return { backgroundColor: '#E1E1E1', borderColor: '#888' };
      case 1:
        return { backgroundColor: '#FFEB3B', borderColor: '#FBC02D' };
      case 2:
        return { backgroundColor: '#4CAF50', borderColor: '#388E3C' };
      case 3:
        return { backgroundColor: '#2196F3', borderColor: '#1976D2' };
      case 4:
        return { backgroundColor: '#9C27B0', borderColor: '#7B1FA2' };
      default:
        return {};
    }
  };

  // Filtrar logros según el tier seleccionado
  const filteredAchievements = achievements.filter(ach => ach.tier === selectedTier);

  return (
    <div className="App">
      <header className="title-container">
        <img
          src="/title-image.png"
          alt="Minecraft Hardcore Tracker"
          className="title-image"
        />
      </header>

      {/* Menú lateral con los 5 tiers */}
      <div className="side-menu">
        <ul>
          {tiers.map((tier) => (
            <li
              key={tier.value}
              className={`tier-item ${selectedTier === tier.value ? "active" : ""}`}
              onClick={() => handleTierClick(tier.value)}
            >
              <img
                src={tier.icon} // Asegúrate de que la ruta del icono es correcta
                alt={`${tier.name} icon`}
                className="tier-icon"
              />
              <span>{tier.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        <div className="achievements-list">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((ach, index) => (
              <div
                key={index}
                className="achievement-item"
                style={{
                  ...getTierStyle(ach.tier),
                  backgroundColor: ach.completed ? '#d4edda' : getTierStyle(ach.tier).backgroundColor,
                  border: ach.completed ? '2px solid #28a745' : '2px solid',
                }}
                onClick={() => toggleCompletion(index)}
              >
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
                <p className="tier-label">Tier {ach.tier}</p>
                <p className="status-label">{ach.completed ? 'Completado' : 'No completado'}</p>
              </div>
            ))
          ) : (
            <p>No hay logros en este tier.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
