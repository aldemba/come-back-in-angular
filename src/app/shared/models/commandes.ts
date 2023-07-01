export interface Commandes {
    commandeMenus: CommandeMenu[]
    commandeBurgers: CommandeBurger[]
    commandePortions: CommandePortion[]
    commandeTailles: CommandeTaille[]
    zone: Zone
    etat: string
  }
  
  export interface CommandeMenu {
    quantite: number
    menu: Menu
  }
  
  export interface Menu {
    id: number
  }
  
  export interface CommandeBurger {
    burger: Burger
    quantite: number
  }
  
  export interface Burger {
    id: number
  }
  
  export interface CommandePortion {
    portion: Portion
    quantite: number
  }
  
  export interface Portion {
    id: number
  }
  
  export interface CommandeTaille {
    tailleboisson: Tailleboisson
    quantite: number
  }
  
  export interface Tailleboisson {
    id: number
  }
  
  export interface Zone {
    id: number
  }
  