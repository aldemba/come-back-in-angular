export interface Details {
    "@context": string
    "@id": string
    "@type": string
    id: number
    produit: Produit
    boissons: Boisson[]
    portions: Portion[]
  }
  
  export interface Produit {
    "@id": string
    "@type": string
    id: number
    nom: string
    prix: number
    image: string
    description: string
  }
  
  export interface Boisson {
    "@id": string
    "@type": string
    id: number
    nom: string
    prix: any
    image: string
    description: string
  }
  
  export interface Portion {
    "@id": string
    "@type": string
    id: number
    nom: string
    prix: number
    image: string
    description: string
  }
  