// @fixme : rendre le code plus propre, en le mettant dans une fonction à part (ou un objet ?)
// Définir les différents types de ramassages
let ramassages = {
    'non_recyclables': {
        'name': 'Déchets non recyclables',
        'bin' : 'Grise',
        'background': '#616161',
        'color': '#FFFFFF',
        'image': 'img/poubelle-gris.png',
        'description': 'Ensemble des déchets ne pouvant pas être recyclés.',
        'schedule_time': '8h - 12h'
    },
    'plastiques': {
        'name': 'Déchets plastiques',
        'bin' : 'Jaune',
        'background': '#F9A825',
        'color' : '#000000',
        'image': 'img/poubelle-jaune-2.png',
        'description': 'Déchets d\'origine plastiques (durs uniquement).',
        'schedule_time': '13h - 15h'
    },
    'verres': {
        'name': 'Déchets en verre',
        'bin' : 'Point d\'apport volontaire',
        'background': '#388E3C',
        'color' : '#000000',
        'image': 'img/poubelle-vert.png',
        'description': 'Déchets en verre (en bon état uniquement), à apporter au point d\'apport volontaire le plus proche.',
        'schedule_time': '07h - 10h'
    },
    'metaux': {
        'name': 'Déchets métalliques',
        'bin' : 'Bleue',
        'background': '#1976D2',
        'color' : '#FFFFFF',
        'image': 'img/poubelle-bleu-2.png',
        'description': 'Déchets métalliques recyclables.',
        'schedule_time': '10h - 14h'
    }
};

let jours_ramassages = {
    0: [], // Dimanche
    1: [ ramassages.non_recyclables, ramassages.plastiques ], // Lundi
    2: [ ramassages.metaux ], // Mardi
    3: [ ramassages.non_recyclables ], // Mercredi
    4: [ ramassages.metaux ], // Jeudi
    5: [ ramassages.plastiques ], // Vendredi
    6: [], // Samedi
    //6: [ ramassages.cartons ], // Samedi
}

// /@fixme

class Calendar
{

    constructor(domTarget)
    {
        // On récupère l'élément DOM passé en paramètre
        domTarget = domTarget || '.calendar';
        this.domElement = document.querySelector(domTarget);

        // Renvoit une erreur si l'élément n'éxiste pas
        if(!this.domElement) throw "Calendar - L'élément spécifié est introuvable";

        // Liste des mois
        this.monthList = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aôut', 'septembre', 'octobre', 'novembre', 'décembre');

        // Liste des jours de la semaine
        //this.dayList = new Array('dimanche' ,'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
        this.dayList = new Array('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi','dimanche');

        // Date actuelle
        this.today = new Date();
        this.today.setHours(0,0,0,0);

        // Mois actuel
        //this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(),7);

        // On créé le div qui contiendra l'entête de notre calendrier
        let header = document.createElement('div');
        header.classList.add('header');
        this.domElement.appendChild(header);

        // On créé le div qui contiendra les jours de notre calendrier
        //var test = document.createElement('tr');
        this.content = document.createElement('div');
        this.domElement.appendChild(this.content);

        // Bouton "précédent"
        let previousButton = document.createElement('button');
        previousButton.setAttribute('data-action', '-1');
        previousButton.textContent = '\u003c';
        header.appendChild(previousButton);

        // Div qui contiendra le mois/année affiché
        this.monthDiv = document.createElement('tr');
        this.monthDiv.classList.add('month');
        header.appendChild(this.monthDiv);

        // Bouton "suivant"
        let nextButton = document.createElement('button');
        nextButton.setAttribute('data-action', '1');
        nextButton.textContent = '\u003e';
        header.appendChild(nextButton);

        // Action des boutons "précédent" et "suivant"
        this.domElement.querySelectorAll('button').forEach(element =>
        {
            element.addEventListener('click', () =>
            {
                this.currentMonth.setMonth(this.currentMonth.getMonth() * 1 + element.getAttribute('data-action') * 1);
                this.loadMonth(this.currentMonth);
            });
        });

        // On charge le mois actuel
        this.loadMonth(this.currentMonth);
        //image
        var myImg= new Image();

         myImg.addEventListener('load', function() {
         });
         myImg.src = 'img/poubelle-gris.png';
    }

    loadMonth(date)
    {
        // On vide notre calendrier
        this.content.textContent = '';

        // On ajoute le mois/année affiché
        this.monthDiv.textContent = this.monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

        // Création des cellules contenant le jour de la semaine
        //var test = document.createElement('tr');
        //this.content = document.createElement('tr');
        for(let i=0; i<this.dayList.length; i++)
        {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.classList.add('day');
            cell.textContent = this.dayList[i].substring(0, 3).toUpperCase();
            this.content.appendChild(cell);
           /* alert(this.dayList[i]);
            console.log(this.dayList[i]);
            if(this.dayList[i] == 'lundi') {
                cell.classList.add('poubelleGrise');
            }*/
           //var jours =
        }
        /*this.dayList.forEach(function(index){
            console.log(index);
           // console.log(item);

        });*/
        //console.log(this.dayList[0]);

        // Création des cellules vides si nécessaire
        for(let i=0; i<date.getDay(); i++)
        {
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.classList.add('empty');
            this.content.appendChild(cell);
        }

        // Nombre de jour dans le mois affiché
        let monthLength = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

        // Création des cellules contenant les jours du mois affiché
        for(let i=1; i<=monthLength; i++)
        {
            // Timestamp de la cellule
            let curDate = new Date(date.getFullYear(), date.getMonth(), i);
            let dayOfWeek = curDate.getDay();
            let timestamp = curDate.getTime();

            // Création de l'élément DOM
            let cell = document.createElement('td');
            cell.classList.add('cell');
            cell.textContent = i;
            cell.setAttribute('data-day', dayOfWeek);
            this.content.appendChild(cell);

            cell.addEventListener("click", function(){
                // Récupération des jours de ramassage
                var jours_ramassage_concernes = jours_ramassages[this.getAttribute('data-day')];

                // Si l'on a des ramassages de prévus
                if(jours_ramassage_concernes.length > 0) {
                    // Effaçage du contenu précédent dans details
                    document.getElementById('details_dynamic').innerHTML = '';

                    // Pour chaque ramassage
                    jours_ramassage_concernes.forEach(function(element){
                        // Créer une div.poubelle
                        var poubelle_container = document.createElement('div');
                        poubelle_container.classList.add('poubelle');

                        // Ajout d'un titre dans le conteneur
                        var poubelle_container_titre = document.createElement('h1');
                        poubelle_container_titre.classList.add('poubelle_titre');
                        poubelle_container_titre.innerHTML = element.name;

                        // Ajout d'une image dans le conteneur
                        var poubelle_container_image = document.createElement('img');
                        poubelle_container_image.src = element.image;

                        // Ajout d'une description
                        var poubelle_container_description = document.createElement('p');
                        poubelle_container_description.innerHTML = element.description;

                        // Ajout du label d'horaire
                        var poubelle_container_label_horaire = document.createElement('strong');
                        poubelle_container_label_horaire.innerHTML = 'Horaires';

                        // Ajout des horaires
                        var poubelle_container_horaire = document.createElement('p');
                        poubelle_container_horaire.classList.add('poubelle_horaires');
                        poubelle_container_horaire.innerHTML = element.schedule_time;

                        // Insertion des éléments dans notre conteneur
                        poubelle_container.appendChild(poubelle_container_titre);
                        poubelle_container.appendChild(poubelle_container_image);
                        poubelle_container.appendChild(poubelle_container_description);
                        poubelle_container.appendChild(poubelle_container_label_horaire);
                        poubelle_container.appendChild(poubelle_container_horaire);

                        // Insertion du conteneur dans la page
                        document.getElementById('details_dynamic').appendChild(poubelle_container);
                    });

                    showContainer('details');
                }
            });


            // Ajoute une classe spéciale pour aujourd'hui
            if(timestamp === this.today.getTime())
            {
                cell.classList.add('today');
            }

            // Pour chaque ramassage du jour actuel
            jours_ramassages[dayOfWeek].forEach(function(element){
                // On créé un span à l'intérieur de notre cell
                let marqueur_poubelle = document.createElement('td');
                marqueur_poubelle.classList.add('marqueur_poubelle');
                marqueur_poubelle.style.backgroundColor = element.background;
                marqueur_poubelle.style.color = element.color;
                marqueur_poubelle.style.color = element.color;

                //marqueur_poubelle.textContent= element.name;
                cell.appendChild(marqueur_poubelle);

            });
        }
    }
}

// Création de notre objet
const calendar = new Calendar('#calendar');