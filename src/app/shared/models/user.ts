export interface User {
    id? : number;

    email? : string;

    roles? : [];

    password? : string;

    confirmPassword? : string;

    nom? : string;

    prenom? : string;

    telephone? : string;

    isEtat? : boolean

    produits? : [];

    token? : string;

    matriculeMoto? : string;

    isActivated? : boolean;

    expiredAt? : Date;

    isDisponible? : boolean;

    livraisons? : [{
        id: number
        date: string
    }]
}
