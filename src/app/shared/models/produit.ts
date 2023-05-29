export interface Produit {
    id?:number
    nom:string
    image:Blob
    description:string
    quantite:number
    prix:number
    "@type":string
    type:string
    boissons:Produit[]
    tailleBoissons:any[]

}
