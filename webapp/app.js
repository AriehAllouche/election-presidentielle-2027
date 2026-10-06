// --- CONFIGURATION DES BLOCS ---
const BLOCS = {
    'extgauche': { nom: 'Extrême Gauche', color: '#991b1b', bgClass: 'bg-red-50 text-red-700 hover:bg-red-100', activeClass: 'bg-red-700 text-white border-red-700' },
    'gauche':    { nom: 'Gauche', color: '#e11d48', bgClass: 'bg-rose-50 text-rose-700 hover:bg-rose-100', activeClass: 'bg-rose-600 text-white border-rose-600' },
    'ecolo':     { nom: 'Écologistes', color: '#16a34a', bgClass: 'bg-green-50 text-green-700 hover:bg-green-100', activeClass: 'bg-green-600 text-white border-green-600' },
    'centre':    { nom: 'Centre', color: '#9333ea', bgClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100', activeClass: 'bg-purple-600 text-white border-purple-600' },
    'droite':    { nom: 'Droite', color: '#1d4ed8', bgClass: 'bg-blue-50 text-blue-700 hover:bg-blue-100', activeClass: 'bg-blue-700 text-white border-blue-700' },
    'extdroite': { nom: 'Extrême Droite', color: '#111827', bgClass: 'bg-gray-200 text-gray-900 hover:bg-gray-300', activeClass: 'bg-gray-900 text-white border-gray-900' },
    'autre':     { nom: 'Autres', color: '#6b7280', bgClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200', activeClass: 'bg-gray-600 text-white border-gray-600' }
};

const STATUTS = {
    'declare': { label: 'Déclaré(e)', class: 'badge-declare' },
    'primaire': { label: 'En Primaire', class: 'badge-primaire' },
    'pressenti': { label: 'Pressenti(e)', class: 'badge-pressenti' },
    'renonce': { label: 'Renonce', class: 'badge-renonce' }
};

// --- CONFIGURATION STRICTE DES 13 THEMES OFFICIELS ---
const THEMES_CATEGORIES = [
    { id: 'economie', label: 'Économie, fiscalité et finances publiques', icon: 'fa-coins', keywords: ['économie', 'impôt', 'tva', 'fiscal', 'finance', 'déficit', 'isf', 'cvae', 'taxe', 'dette', 'budget', 'csg'] },
    { id: 'travail', label: 'Travail, salaires et pouvoir d\'achat', icon: 'fa-briefcase', keywords: ['travail', 'salaire', 'smic', 'pouvoir d\'achat', 'dividende', 'chômeur', 'pénibilité', 'carrière'] },
    { id: 'retraites', label: 'Retraites et protection sociale', icon: 'fa-wheelchair', keywords: ['retraite', 'annuité', 'pension', 'sécurité sociale', 'cotisation', 'âge légal', 'capitalisation', 'répartition'] },
    { id: 'sante', label: 'Santé', icon: 'fa-staff-snake', keywords: ['santé', 'hôpital', 'chu', 'soin', 't2a', 'médical', 'médecin'] },
    { id: 'education', label: 'Éducation, jeunesse et recherche', icon: 'fa-graduation-cap', keywords: ['éducation', 'école', 'professeur', 'lycée', 'étudiant', 'recherche', 'bafa', 'jeunesse', 'savoirs'] },
    { id: 'ecologie', label: 'Écologie, climat et énergie', icon: 'fa-leaf', keywords: ['écolog', 'climat', 'zan', 'énergie', 'nucléaire', 'renouvelable', 'pollution', 'carburant', 'essence'] },
    { id: 'immigration', label: 'Immigration et intégration', icon: 'fa-passport', keywords: ['immigration', 'étranger', 'sans-papiers', 'frontière', 'asile', 'migratoire', 'régularisation'] },
    { id: 'securite', label: 'Sécurité et justice', icon: 'fa-shield-halved', keywords: ['sécurité', 'justice', 'police', 'prison', 'délit', 'peine', 'violence', 'délinquant', 'ordre public'] },
    { id: 'international', label: 'Europe, international et défense', icon: 'fa-globe', keywords: ['europe', 'ue', 'européen', 'otan', 'défense', 'guerre', 'ukraine', 'poutine', 'diplomatie', 'international', 'israël', 'gaza'] },
    { id: 'institutions', label: 'Institutions et démocratie', icon: 'fa-landmark', keywords: ['institution', 'démocratie', 'constitution', 'référendum', 'ric', 'assemblée', 'élection', 'république'] },
    { id: 'logement', label: 'Logement', icon: 'fa-house', keywords: ['logement', 'sru', 'hlm', 'immobilier', 'loyer', 'dpe', 'squat'] },
    { id: 'agriculture', label: 'Agriculture, ruralité et services publics locaux', icon: 'fa-tractor', keywords: ['agriculture', 'agricole', 'rural', 'paysan', 'service public', 'commune', 'territoire'] },
    { id: 'societe', label: 'Société et libertés', icon: 'fa-users', keywords: ['société', 'liberté', 'ivg', 'pma', 'transition', 'voile', 'laïcité', 'discrimination', 'enfant'] }
];

// --- ETAT GLOBAL ---
let state = {
    section: 'carto',
    filters: { text: '', statut: 'all', bloc: 'all' },
    activeTheme: 'economie',
    comparison: [], // Liste des candidats sélectionnés pour comparaison (max 2)
    showFullHistory: false // Pour la modale candidat
};

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFilters();
    renderCartographie();
    renderThemesMenu();
    renderThemeContent();
});

// --- NAVIGATION & UI ---
function initNavigation() {
    const bindNav = (id, section) => {
        const btn = document.getElementById(id);
        if(btn) btn.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.add('hidden');
            showSection(section);
        });
    };

    bindNav('btn-cartographie', 'carto');
    bindNav('btn-themes', 'themes');
    bindNav('btn-quiz', 'quiz');
    bindNav('btn-cartographie-mob', 'carto');
    bindNav('btn-themes-mob', 'themes');
    bindNav('btn-quiz-mob', 'quiz');

    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    document.getElementById('close-modal').addEventListener('click', closeCandidatModal);
    document.getElementById('candidat-backdrop').addEventListener('click', closeCandidatModal);

    document.getElementById('close-lexique').addEventListener('click', closeLexique);
    document.getElementById('lexique-backdrop').addEventListener('click', closeLexique);

    // Modal Comparaison
    document.getElementById('close-comparison').addEventListener('click', closeComparisonModal);
    document.getElementById('comparison-backdrop').addEventListener('click', closeComparisonModal);
}

function showSection(targetSection) {
    state.section = targetSection;
    
    ['carto', 'themes', 'quiz'].forEach(sec => {
        const el = document.getElementById(`section-${sec === 'carto' ? 'cartographie' : sec}`);
        if(sec === targetSection) {
            el.classList.remove('hidden');
            el.classList.add('fade-in');
        } else {
            el.classList.add('hidden');
            el.classList.remove('fade-in');
        }
    });

    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${targetSection === 'carto' ? 'cartographie' : targetSection}`).classList.add('active');
    document.getElementById(`btn-${targetSection === 'carto' ? 'cartographie' : targetSection}-mob`).classList.add('active');

    if(targetSection === 'quiz') initQuiz();
}

// --- CARTOGRAPHIE & FILTRES ---
function initFilters() {
    document.getElementById('search-input').addEventListener('input', (e) => {
        state.filters.text = e.target.value.toLowerCase();
        renderCartographie();
    });

    document.querySelectorAll('.filter-statut').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-statut').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.filters.statut = e.target.getAttribute('data-statut');
            renderCartographie();
        });
    });

    document.querySelectorAll('.filter-bloc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target;
            const bloc = btnEl.getAttribute('data-bloc');
            
            document.querySelectorAll('.filter-bloc').forEach(b => {
                const bBloc = b.getAttribute('data-bloc');
                b.classList.remove('active');
                if (bBloc !== 'all' && BLOCS[bBloc]) {
                    BLOCS[bBloc].activeClass.split(' ').forEach(cls => b.classList.remove(cls));
                    BLOCS[bBloc].bgClass.split(' ').forEach(cls => b.classList.add(cls));
                }
            });

            btnEl.classList.add('active');
            if (bloc !== 'all' && BLOCS[bloc]) {
                BLOCS[bloc].bgClass.split(' ').forEach(cls => btnEl.classList.remove(cls));
                BLOCS[bloc].activeClass.split(' ').forEach(cls => btnEl.classList.add(cls));
            }
            
            state.filters.bloc = bloc;
            renderCartographie();
        });
    });
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    state.filters = { text: '', statut: 'all', bloc: 'all' };
    
    document.querySelectorAll('.filter-statut').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-statut[data-statut="all"]').classList.add('active');
    
    document.querySelectorAll('.filter-bloc').forEach(b => {
        const bloc = b.getAttribute('data-bloc');
        b.classList.remove('active');
        if (bloc !== 'all' && BLOCS[bloc]) {
            BLOCS[bloc].activeClass.split(' ').forEach(cls => b.classList.remove(cls));
            BLOCS[bloc].bgClass.split(' ').forEach(cls => b.classList.add(cls));
        }
    });
    document.querySelector('.filter-bloc[data-bloc="all"]').classList.add('active');
    
    renderCartographie();
}

function renderCartographie() {
    const container = document.getElementById('blocs-container');
    const ghostContainer = document.getElementById('ghost-candidates-container');
    const ghostSection = document.getElementById('ghost-candidates-section');
    const noResults = document.getElementById('no-results');
    container.innerHTML = '';
    ghostContainer.innerHTML = '';

    let candidats = openData.candidats.candidats;

    candidats = candidats.filter(c => {
        const matchText = c.nom.toLowerCase().includes(state.filters.text) || c.parti.toLowerCase().includes(state.filters.text);
        const matchStatut = state.filters.statut === 'all' || c.statut === state.filters.statut;
        const matchBloc = state.filters.bloc === 'all' || c.bloc === state.filters.bloc;
        return matchText && matchStatut && matchBloc;
    });

    // Séparer les candidats documentés des fantômes
    const documented = [];
    const ghosts = [];

    candidats.forEach(c => {
        const hasProps = c.propositions && c.propositions.length > 0;
        const hasParoles = openData.prisesDeParole.prises_de_parole.some(p => p.id === c.id);
        const hasVotes = openData.votes.scrutins.some(s => s.votes && s.votes[c.id]);

        if (hasProps || hasParoles || hasVotes) {
            documented.push(c);
        } else {
            ghosts.push(c);
        }
    });

    if (documented.length === 0 && ghosts.length === 0) {
        noResults.classList.remove('hidden');
        ghostSection.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');

        // Afficher les candidats documentés
        documented.forEach(c => {
            const blocConf = BLOCS[c.bloc] || BLOCS['autre'];
            const statConf = STATUTS[c.statut] || { label: 'Inconnu', class: 'badge-renonce' };
            const initiales = c.nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
            const isSelected = state.comparison.includes(c.id);

            const card = document.createElement('div');
            card.className = "candidat-card";
            card.style.setProperty('--card-color', blocConf.color);

            card.innerHTML = `
                <div class="p-5 flex-grow">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" style="background-color: ${blocConf.color}">
                            ${initiales}
                        </div>
                        <div class="flex items-center gap-2">
                            <label class="cursor-pointer relative">
                                <input type="checkbox" class="comparison-checkbox sr-only" data-id="${c.id}" ${isSelected ? 'checked' : ''}>
                                <div class="w-8 h-8 rounded-full border-2 ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 hover:border-blue-400'} flex items-center justify-center transition-all">
                                    <i class="fa-solid fa-scale-balanced text-xs"></i>
                                </div>
                            </label>
                            <span class="text-xs px-2.5 py-1 rounded-full font-medium shadow-sm ${statConf.class}">${statConf.label}</span>
                        </div>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 leading-tight mb-1">${c.nom}</h3>
                    <p class="text-sm font-medium text-gray-500 mb-3">${c.parti}</p>
                    <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">${blocConf.nom}</p>
                </div>
                <div class="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                    <span class="text-sm text-gray-500 font-medium">Voir profil & mesures</span>
                    <i class="fa-solid fa-arrow-right text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                </div>
            `;

            // Checkbox event
            const checkbox = card.querySelector('.comparison-checkbox');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                toggleComparison(c.id);
            });

            card.addEventListener('click', () => openCandidatModal(c));
            container.appendChild(card);
        });

        // Afficher l'accordéon si des fantômes existent
        if (ghosts.length > 0) {
            ghostSection.classList.remove('hidden');
            ghosts.forEach(c => {
                const blocConf = BLOCS[c.bloc] || BLOCS['autre'];
                const statConf = STATUTS[c.statut] || { label: 'Inconnu', class: 'badge-renonce' };
                const initiales = c.nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

                const card = document.createElement('div');
                card.className = "candidat-card opacity-60";
                card.style.setProperty('--card-color', blocConf.color);

                card.innerHTML = `
                    <div class="p-5 flex-grow">
                        <div class="flex justify-between items-start mb-4">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" style="background-color: ${blocConf.color}">
                                ${initiales}
                            </div>
                            <span class="text-xs px-2.5 py-1 rounded-full font-medium shadow-sm ${statConf.class}">${statConf.label}</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 leading-tight mb-1">${c.nom}</h3>
                        <p class="text-sm font-medium text-gray-500 mb-3">${c.parti}</p>
                        <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">${blocConf.nom}</p>
                    </div>
                    <div class="bg-gray-50 px-5 py-3 border-t border-gray-100">
                        <span class="text-xs text-gray-400 italic">Aucune donnée documentée</span>
                    </div>
                `;

                card.addEventListener('click', () => openCandidatModal(c));
                ghostContainer.appendChild(card);
            });
        } else {
            ghostSection.classList.add('hidden');
        }
    }

    updateComparisonBar();
}

// --- FONCTIONS COMPARAISON FACE À FACE ---
function toggleComparison(candidatId) {
    const index = state.comparison.indexOf(candidatId);
    if (index > -1) {
        state.comparison.splice(index, 1);
    } else {
        if (state.comparison.length >= 2) {
            alert('Vous ne pouvez comparer que 2 candidats à la fois.');
            return;
        }
        state.comparison.push(candidatId);
    }
    renderCartographie();
}

function clearComparison() {
    state.comparison = [];
    renderCartographie();
}

function updateComparisonBar() {
    const bar = document.getElementById('comparison-bar');
    const selectedContainer = document.getElementById('comparison-selected');

    if (state.comparison.length === 0) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');
    selectedContainer.innerHTML = '';

    state.comparison.forEach(id => {
        const c = openData.candidats.candidats.find(cand => cand.id === id);
        if (c) {
            const blocConf = BLOCS[c.bloc] || BLOCS['autre'];
            const badge = document.createElement('div');
            badge.className = 'flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full';
            badge.innerHTML = `
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background-color: ${blocConf.color}">
                    ${c.nom[0]}
                </div>
                <span class="text-sm font-medium text-gray-700">${c.nom.split(' ')[0]}</span>
            `;
            selectedContainer.appendChild(badge);
        }
    });
}

function showComparisonModal() {
    if (state.comparison.length !== 2) {
        alert('Veuillez sélectionner exactement 2 candidats pour les comparer.');
        return;
    }

    const c1 = openData.candidats.candidats.find(c => c.id === state.comparison[0]);
    const c2 = openData.candidats.candidats.find(c => c.id === state.comparison[1]);

    if (!c1 || !c2) return;

    const modal = document.getElementById('comparison-modal');
    const content = document.getElementById('comparison-content');

    const blocConf1 = BLOCS[c1.bloc] || BLOCS['autre'];
    const blocConf2 = BLOCS[c2.bloc] || BLOCS['autre'];

    let html = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Candidat 1 -->
            <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md" style="background-color: ${blocConf1.color}">
                        ${c1.nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900">${c1.nom}</h4>
                        <p class="text-sm text-gray-600">${c1.parti} • ${blocConf1.nom}</p>
                    </div>
                </div>
                ${renderCandidatComparisonData(c1)}
            </div>

            <!-- Candidat 2 -->
            <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md" style="background-color: ${blocConf2.color}">
                        ${c2.nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-900">${c2.nom}</h4>
                        <p class="text-sm text-gray-600">${c2.parti} • ${blocConf2.nom}</p>
                    </div>
                </div>
                ${renderCandidatComparisonData(c2)}
            </div>
        </div>

        <!-- Comparaison thématique -->
        <div class="mt-8">
            <h4 class="text-lg font-bold text-gray-900 mb-4"><i class="fa-solid fa-layer-group text-blue-600 mr-2"></i>Comparaison par Thèmes</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${THEMES_CATEGORIES.slice(0, 6).map(theme => {
                    const props1 = (c1.propositions || []).filter(p => theme.keywords.some(kw => p.toLowerCase().includes(kw)));
                    const props2 = (c2.propositions || []).filter(p => theme.keywords.some(kw => p.toLowerCase().includes(kw)));
                    return `
                        <div class="bg-white border border-gray-200 rounded-lg p-4">
                            <h5 class="font-bold text-gray-800 mb-2 flex items-center">
                                <i class="fa-solid ${theme.icon} text-blue-500 mr-2"></i>${theme.label}
                            </h5>
                            <div class="space-y-2 text-sm">
                                <div class="flex items-start gap-2">
                                    <span class="w-2 h-2 rounded-full mt-1.5" style="background-color: ${blocConf1.color}"></span>
                                    <span class="text-gray-600">${props1.length > 0 ? props1[0].substring(0, 80) + '...' : 'Aucune proposition'}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="w-2 h-2 rounded-full mt-1.5" style="background-color: ${blocConf2.color}"></span>
                                    <span class="text-gray-600">${props2.length > 0 ? props2[0].substring(0, 80) + '...' : 'Aucune proposition'}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    content.innerHTML = html;
    attachLexiqueEvents(content);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.getElementById('comparison-backdrop').classList.add('opacity-100');
        const card = document.getElementById('comparison-modal-card');
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function renderCandidatComparisonData(c) {
    const paroles = openData.prisesDeParole.prises_de_parole.filter(p => p.id === c.id).slice(0, 3);
    const votes = openData.votes.scrutins.filter(s => s.votes && s.votes[c.id]).slice(0, 3);

    return `
        <div class="space-y-4">
            <div>
                <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Propositions</h5>
                <ul class="text-sm text-gray-700 space-y-1 pl-4 list-disc marker:text-blue-500">
                    ${(c.propositions || []).slice(0, 3).map(p => `<li>${p}</li>`).join('') || '<li class="text-gray-400 italic">Aucune proposition</li>'}
                </ul>
            </div>
            ${paroles.length > 0 ? `
                <div>
                    <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Déclarations récentes</h5>
                    <ul class="text-sm text-gray-700 space-y-2">
                        ${paroles.map(p => `<li class="italic">« ${p.declare[0]?.substring(0, 60)}... »</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${votes.length > 0 ? `
                <div>
                    <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Votes clés</h5>
                    <div class="space-y-2">
                        ${votes.map(v => {
                            const voteVal = v.votes[c.id];
                            const badgeColor = voteVal === 'pour' ? 'bg-green-100 text-green-800' : voteVal === 'contre' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600';
                            return `<div class="flex justify-between items-center text-sm">
                                <span class="text-gray-600 truncate mr-2">${v.titre.substring(0, 40)}...</span>
                                <span class="${badgeColor} px-2 py-0.5 rounded text-xs font-bold uppercase">${voteVal}</span>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function closeComparisonModal() {
    document.getElementById('comparison-backdrop').classList.remove('opacity-100');
    const card = document.getElementById('comparison-modal-card');
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        document.getElementById('comparison-modal').classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

function toggleGhostCandidates() {
    const container = document.getElementById('ghost-candidates-container');
    const chevron = document.getElementById('ghost-chevron');
    const text = document.getElementById('ghost-toggle-text');

    container.classList.toggle('hidden');
    chevron.classList.toggle('rotate-180');

    if (container.classList.contains('hidden')) {
        text.textContent = 'Voir les profils non documentés';
    } else {
        text.textContent = 'Masquer les profils non documentés';
    }
}

// --- MODAL CANDIDAT ---
function openCandidatModal(c) {
    const modal = document.getElementById('candidat-modal');
    const headerBg = document.getElementById('modal-header-bg');
    const avatar = document.getElementById('modal-avatar');

    const blocConf = BLOCS[c.bloc] || BLOCS['autre'];

    document.getElementById('modal-candidat-nom').textContent = c.nom;
    document.getElementById('modal-candidat-parti').textContent = `${c.parti} • ${blocConf.nom}`;

    avatar.textContent = c.nom.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    headerBg.style.backgroundColor = blocConf.color;

    // Réinitialiser l'état d'affichage complet
    state.showFullHistory = false;

    let html = `
        <div class="p-6 md:p-8 space-y-8">
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                <i class="fa-solid fa-circle-info text-blue-500 mt-0.5 mr-3 text-lg"></i>
                <p class="text-sm text-blue-900 leading-relaxed">${c.statut_detail || 'Aucun détail supplémentaire sur le statut.'}</p>
            </div>
    `;

    html += `<div><h4 class="flex items-center text-lg font-extrabold text-gray-900 mb-4"><i class="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Principales Propositions (Authentifiées)</h4>`;
    if (c.propositions && c.propositions.length > 0) {
        const propsToShow = state.showFullHistory ? c.propositions : c.propositions.slice(0, 5);
        html += `<ul class="space-y-3" id="propositions-list">`;
        propsToShow.forEach(p => {
            html += `<li class="flex items-start">
                <span class="text-blue-500 mr-3 mt-1"><i class="fa-solid fa-check"></i></span>
                <span class="text-gray-700 leading-relaxed">${rendreLexiqueInteractif(p)}</span>
            </li>`;
        });
        html += `</ul>`;
        if (c.propositions.length > 5 && !state.showFullHistory) {
            html += `<button onclick="toggleFullHistory()" class="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"><i class="fa-solid fa-chevron-down mr-1"></i>Voir toutes les propositions (${c.propositions.length})</button>`;
        }
    } else {
        html += `<div class="bg-gray-100 text-gray-600 p-4 rounded-lg text-sm italic text-center">Aucune proposition formelle recensée dans les données publiques.</div>`;
    }
    html += `</div>`;

    const paroles = openData.prisesDeParole.prises_de_parole.filter(p => p.id === c.id);
    html += `<div><h4 class="flex items-center text-lg font-extrabold text-gray-900 mb-4"><i class="fa-solid fa-microphone-lines text-red-500 mr-2"></i>Prises de Parole Récentes</h4>`;
    if (paroles.length > 0) {
        const parolesToShow = state.showFullHistory ? paroles : paroles.slice(0, 3);
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="paroles-list">`;
        parolesToShow.forEach(p => {
            html += `
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">${p.type}</span>
                    <span class="text-xs text-gray-400"><i class="fa-regular fa-calendar mr-1"></i>${p.date}</span>
                </div>
                <h5 class="text-sm font-bold text-gray-900 mb-2 line-clamp-2" title="${p.titre}">${p.titre}</h5>
                <ul class="text-sm text-gray-600 space-y-1 pl-4 list-disc marker:text-gray-300">
                    ${p.declare.map(d => `<li>${rendreLexiqueInteractif(d)}</li>`).join('')}
                </ul>
                ${p.source ? `<a href="${p.source}" target="_blank" class="inline-flex items-center mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"><i class="fa-solid fa-external-link-alt mr-1"></i>Voir la source</a>` : ''}
            </div>`;
        });
        html += `</div>`;
        if (paroles.length > 3 && !state.showFullHistory) {
            html += `<button onclick="toggleFullHistory()" class="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"><i class="fa-solid fa-chevron-down mr-1"></i>Voir toutes les déclarations (${paroles.length})</button>`;
        }
    } else {
        html += `<div class="bg-gray-100 text-gray-600 p-4 rounded-lg text-sm italic text-center">Aucune déclaration récente répertoriée dans la base.</div>`;
    }
    html += `</div>`;

    const votesCandidat = openData.votes.scrutins.filter(s => s.votes && s.votes[c.id]);
    html += `<div><h4 class="flex items-center text-lg font-extrabold text-gray-900 mb-4"><i class="fa-solid fa-check-to-slot text-green-600 mr-2"></i>Votes Parlementaires Clés</h4>`;
    if (votesCandidat.length > 0) {
        const votesToShow = state.showFullHistory ? votesCandidat : votesCandidat.slice(0, 3);
        html += `<div class="space-y-3" id="votes-list">`;
        votesToShow.forEach(v => {
            const voteVal = v.votes[c.id];
            let badge = '';
            if(voteVal === 'pour') badge = '<span class="bg-green-100 text-green-800 border border-green-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase shadow-sm"><i class="fa-solid fa-thumbs-up mr-1"></i>Pour</span>';
            else if(voteVal === 'contre') badge = '<span class="bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase shadow-sm"><i class="fa-solid fa-thumbs-down mr-1"></i>Contre</span>';
            else badge = `<span class="bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md text-xs font-bold uppercase shadow-sm">${voteVal}</span>`;

            html += `
            <div class="bg-white border border-gray-200 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div class="flex-grow pr-4">
                    <p class="text-sm font-medium text-gray-800 leading-snug">${v.titre}</p>
                    <span class="text-xs text-gray-400 mt-1 block">${v.date} - ${v.chambre}</span>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                    ${badge}
                    ${v.source ? `<a href="${v.source}" target="_blank" class="text-gray-400 hover:text-blue-600 transition-colors" title="Voir la source"><i class="fa-solid fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>`;
        });
        html += `</div>`;
        if (votesCandidat.length > 3 && !state.showFullHistory) {
            html += `<button onclick="toggleFullHistory()" class="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"><i class="fa-solid fa-chevron-down mr-1"></i>Voir tout l'historique (${votesCandidat.length} votes)</button>`;
        }
    } else {
        html += `<div class="bg-gray-100 text-gray-600 p-4 rounded-lg text-sm italic text-center">Aucun historique de vote majeur récent.</div>`;
    }
    html += `</div></div>`;

    document.getElementById('modal-candidat-content').innerHTML = html;
    attachLexiqueEvents(document.getElementById('modal-candidat-content'));

    // Animation d'ouverture
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Bloquer le scroll derrière

    setTimeout(() => {
        document.getElementById('candidat-backdrop').classList.add('opacity-100');
        const card = document.getElementById('candidat-modal-card');
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function toggleFullHistory() {
    state.showFullHistory = !state.showFullHistory;
    // Récupérer le candidat actuel depuis le modal
    const nom = document.getElementById('modal-candidat-nom').textContent;
    const c = openData.candidats.candidats.find(cand => cand.nom === nom);
    if (c) {
        openCandidatModal(c);
    }
}

function closeCandidatModal() {
    document.getElementById('candidat-backdrop').classList.remove('opacity-100');
    const card = document.getElementById('candidat-modal-card');
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        document.getElementById('candidat-modal').classList.add('hidden');
        document.body.style.overflow = ''; // Restaurer le scroll
    }, 300);
}

// --- SECTION: LES 13 THEMES STRICTS ---
function renderThemesMenu() {
    const menuContainer = document.getElementById('themes-menu');
    menuContainer.innerHTML = '';
    
    THEMES_CATEGORIES.forEach(theme => {
        const btn = document.createElement('button');
        btn.className = `theme-menu-btn ${state.activeTheme === theme.id ? 'active' : ''}`;
        btn.innerHTML = `<i class="fa-solid ${theme.icon} w-6 text-center mr-2 opacity-80"></i> ${theme.label}`;
        
        btn.addEventListener('click', () => {
            state.activeTheme = theme.id;
            document.querySelectorAll('.theme-menu-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderThemeContent();
        });
        menuContainer.appendChild(btn);
    });
}

function renderThemeContent() {
    const content = document.getElementById('theme-content');
    const theme = THEMES_CATEGORIES.find(t => t.id === state.activeTheme);
    
    let html = `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center mb-2">
                <i class="fa-solid ${theme.icon} text-blue-600 mr-3"></i> ${theme.label}
            </h2>
            <p class="text-gray-500 text-sm">Propositions exactes et déclarations publiques issues des données open data sur ce sujet.</p>
        </div>
    `;

    const themeData = [];
    openData.candidats.candidats.forEach(c => {
        // Filtrage strict basé sur les mots clés du thème, dans les propositions (candidats.json)
        const relevantProps = (c.propositions || []).filter(p => 
            theme.keywords.some(kw => p.toLowerCase().includes(kw))
        );
        
        // Et dans les prises de parole (prises-de-parole.json), via les tags ou les keywords dans la citation
        const relevantParoles = openData.prisesDeParole.prises_de_parole.filter(p => 
            p.id === c.id && (
                (p.themes && p.themes.includes(theme.id)) ||
                (p.declare.some(decl => theme.keywords.some(kw => decl.toLowerCase().includes(kw))))
            )
        );

        if (relevantProps.length > 0 || relevantParoles.length > 0) {
            themeData.push({ candidat: c, props: relevantProps, paroles: relevantParoles });
        }
    });

    if (themeData.length === 0) {
        html += `<div class="bg-gray-50 border border-gray-200 p-10 rounded-xl text-center">
            <i class="fa-solid fa-file-circle-xmark text-4xl text-gray-300 mb-4"></i>
            <h3 class="text-lg font-medium text-gray-900">Aucune donnée trouvée</h3>
            <p class="text-gray-500 mt-1">Aucune mesure ou déclaration authentifiée n'est recensée dans les données open data pour ce thème à ce jour.</p>
        </div>`;
    } else {
        html += `<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`;
        themeData.forEach(data => {
            const blocConf = BLOCS[data.candidat.bloc] || BLOCS['autre'];
            html += `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div class="p-4 border-b border-gray-100 flex items-center bg-gray-50/50 cursor-pointer" onclick="openCandidatModal(${JSON.stringify(data.candidat).replace(/"/g, '&quot;')})">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 shadow-sm" style="background-color: ${blocConf.color}">
                        ${data.candidat.nom[0]}
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-900">${data.candidat.nom}</h4>
                        <p class="text-xs text-gray-500">${data.candidat.parti}</p>
                    </div>
                </div>
                <div class="p-5 flex-grow space-y-4">
            `;
            
            if (data.props.length > 0) {
                html += `<div>
                    <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Programme</h5>
                    <ul class="text-sm text-gray-700 space-y-1.5 pl-4 list-disc marker:text-blue-500">
                        ${data.props.map(p => `<li>${rendreLexiqueInteractif(p)}</li>`).join('')}
                    </ul>
                </div>`;
            }
            
            if (data.paroles.length > 0) {
                html += `<div>
                    <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Déclarations</h5>
                    <ul class="text-sm text-gray-700 space-y-2 pl-4 list-disc marker:text-red-400">
                        ${data.paroles.slice(0, 2).map(p => `<li><span class="italic text-gray-500 text-xs">« ${p.declare[0]} »</span></li>`).join('')}
                    </ul>
                </div>`;
            }
            
            html += `</div></div>`;
        });
        html += `</div>`;
    }
    
    content.innerHTML = html;
    attachLexiqueEvents(content);
}

// --- LEXIQUE ---
const LEXIQUE = {
    'ISF': "Impôt de Solidarité sur la Fortune : Ancien impôt français payé par les personnes dont le patrimoine dépassait un certain seuil. Remplacé en 2018 par l'IFI.",
    'ZAN': "Zéro Artificialisation Nette : Objectif de la loi Climat consistant à stopper l'étalement urbain d'ici 2050.",
    'SMIC': "Salaire Minimum Interprofessionnel de Croissance : Le salaire minimum légal en France.",
    'CVAE': "Cotisation sur la Valeur Ajoutée des Entreprises : Un impôt local payé par les entreprises réalisant un certain chiffre d'affaires.",
    'SRU': "Loi Solidarité et Renouvellement Urbain : Impose aux communes de disposer d'un quota de logements sociaux (20-25%).",
    'CSG': "Contribution Sociale Généralisée : Impôt prélevé sur la quasi-totalité des revenus pour financer la Sécu.",
    'RIC': "Référendum d'Initiative Citoyenne : Mécanisme démocratique permettant aux citoyens de déclencher un référendum directement."
};

function rendreLexiqueInteractif(texte) {
    let nouveauTexte = texte;
    for (let motClé in LEXIQUE) {
        const regex = new RegExp(`\\b(${motClé})\\b`, 'g');
        nouveauTexte = nouveauTexte.replace(regex, `<span class="lexique-link" data-mot="${motClé}">$1</span>`);
    }
    return nouveauTexte;
}

function attachLexiqueEvents(container) {
    container.querySelectorAll('.lexique-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            const mot = e.target.getAttribute('data-mot');
            document.getElementById('lexique-content').innerHTML = LEXIQUE[mot];
            const mod = document.getElementById('lexique-modal');
            
            mod.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('lexique-backdrop').classList.add('opacity-100');
                const card = document.getElementById('lexique-card');
                card.classList.remove('translate-y-4', 'opacity-0');
                card.classList.add('translate-y-0', 'opacity-100');
            }, 10);
        });
    });
}

function closeLexique() {
    document.getElementById('lexique-backdrop').classList.remove('opacity-100');
    const card = document.getElementById('lexique-card');
    card.classList.remove('translate-y-0', 'opacity-100');
    card.classList.add('translate-y-4', 'opacity-0');
    
    setTimeout(() => {
        document.getElementById('lexique-modal').classList.add('hidden');
    }, 200);
}


// --- PARTIE QUIZ (Basé sur les 13 thèmes authentifiés) ---
const QUIZ_DATA = [
    {
        id: 'q1_economie', theme: "Économie, fiscalité et finances publiques", question: "Quelle politique fiscale privilégiez-vous ?",
        options: [
            { id: "opt1", text: "Rétablissement de l'ISF (Impôt de Solidarité sur la Fortune) et taxation des superprofits.", assoc: "melenchon,roussel,tondelier" },
            { id: "opt2", text: "Suppression de la CSG pour les bas revenus et baisse de l'impôt sur les entreprises.", assoc: "retailleau,philippe,lisnard" },
            { id: "opt3", text: "Réforme fiscale progressive avec tranche à 80% pour les revenus supérieurs à 400 000€.", assoc: "faure,glucksmann" },
            { id: "opt4", text: "Baisse généralisée des impôts et réduction de la dette publique par l'austérité.", assoc: "zemmour,dupont-aignan" }
        ]
    },
    {
        id: 'q2_travail', theme: "Travail, salaires et pouvoir d'achat", question: "Quelle est selon vous la priorité pour le pouvoir d'achat ?",
        options: [
            { id: "opt1", text: "SMIC à 1 600€ net et indexation des salaires sur l'inflation, blocage des marges.", assoc: "melenchon,roussel,kazib,labib" },
            { id: "opt2", text: "Baisse massive des cotisations et de la TVA pour augmenter le salaire net, sans hausse du brut.", assoc: "retailleau,lisnard,philippe,le-pen" },
            { id: "opt3", text: "SMIC à 1 700€, hausse des salaires financée par la taxation des superprofits et méga-héritages.", assoc: "faure,glucksmann,maurel" },
            { id: "opt4", text: "Conditionner les aides aux entreprises / Instaurer un 'ticket climat' et revoir les factures d'énergie.", assoc: "tondelier,ruffin" }
        ]
    },
    {
        id: 'q3_retraites', theme: "Retraites et protection sociale", question: "Quelle proposition soutenez-vous pour notre système de retraites ?",
        options: [
            { id: "opt1", text: "Retraite à 60 ans à taux plein avec 40 annuités de cotisation.", assoc: "melenchon,kazib" },
            { id: "opt2", text: "Retraite à 62 ans, voire 60 ans pour ceux ayant commencé avant 20 ans.", assoc: "le-pen,dupont-aignan" },
            { id: "opt3", text: "Âge de départ progressif à 65 ans et développement de la retraite par capitalisation.", assoc: "philippe,attal,lisnard" },
            { id: "opt4", text: "Sortir de l'âge légal et calculer la retraite selon les annuités et la pénibilité.", assoc: "guedj,cazeneuve,ruffin" }
        ]
    },
    {
        id: 'q4_sante', theme: "Santé", question: "Comment améliorer le système de santé français ?",
        options: [
            { id: "opt1", text: "Plan d'investissement massif dans les hôpitaux publics et financement de la Sécu par la fiscalité.", assoc: "melenchon,roussel,tondelier" },
            { id: "opt2", text: "Développement de la médecine de ville et réforme de la tarification T2A.", assoc: "faure,glucksmann,maurel" },
            { id: "opt3", text: "Libéralisation du secteur santé et encouragement de la complémentaire privée.", assoc: "retailleau,philippe" },
            { id: "opt4", text: "Priorité aux déserts médicaux avec incitations financières pour les médecins.", assoc: "le-pen,dupont-aignan" }
        ]
    },
    {
        id: 'q5_education', theme: "Éducation, jeunesse et recherche", question: "Quelle orientation pour l'éducation et la recherche ?",
        options: [
            { id: "opt1", text: "Recrutement de 50 000 enseignants, hausse des salaires et abrogation de Parcoursup.", assoc: "melenchon,roussel" },
            { id: "opt2", text: "Autonomie des établissements, évaluation par les résultats et réforme du bac.", assoc: "retailleau,philippe,attal" },
            { id: "opt3", text: "Investissement massif dans la recherche et la jeunesse, service civique obligatoire.", assoc: "tondelier,faure,glucksmann" },
            { id: "opt4", text: "Retour aux fondamentaux, rétablissement de l'autorité et réforme des programmes.", assoc: "zemmour,le-pen" }
        ]
    },
    {
        id: 'q6_ecologie', theme: "Écologie, climat et énergie", question: "Quelles mesures écologiques et énergétiques souhaitez-vous ?",
        options: [
            { id: "opt1", text: "Suspension du ZAN (Zéro artificialisation nette) et de la loi SRU, baisse de TVA sur l'énergie.", assoc: "le-pen" },
            { id: "opt2", text: "ISF avec volet climatique ciblant les gros pollueurs, planification et blocage des prix de l'essence.", assoc: "melenchon,roussel" },
            { id: "opt3", text: "Création d'une Sécurité sociale écologique et de l'alimentation, aides renforcées.", assoc: "tondelier" },
            { id: "opt4", text: "Baisse du prix de l'essence par la suppression des taxes et des certificats d'économie d'énergie (CEE).", assoc: "lisnard,royal,dupont-aignan" }
        ]
    },
    {
        id: 'q7_immigration', theme: "Immigration et intégration", question: "Quelle politique migratoire préconisez-vous ?",
        options: [
            { id: "opt1", text: "Régularisation de tous les sans-papiers, liberté de circulation et d'installation.", assoc: "arthaud,kazib,labib" },
            { id: "opt2", text: "Suppression du droit du sol, référendum et politique étudiante stricte.", assoc: "retailleau" },
            { id: "opt3", text: "Expulsion des chômeurs étrangers, des délinquants, priorité nationale absolue.", assoc: "zemmour" },
            { id: "opt4", text: "Immigration planifiée par le Parlement, aide au développement et reconduites ciblées.", assoc: "guedj,bouamrane" }
        ]
    },
    {
        id: 'q8_securite', theme: "Sécurité et justice", question: "Quelle politique de sécurité et de justice privilégiez-vous ?",
        options: [
            { id: "opt1", text: "Renforcement des moyens de la police et de la justice, création de 10 000 postes.", assoc: "retailleau,philippe,attal" },
            { id: "opt2", text: "Police de proximité et réforme de la justice pour plus d'efficacité.", assoc: "faure,glucksmann,maurel" },
            { id: "opt3", text: "Répression sévère et systématique, rétablissement de la peine de mort.", assoc: "zemmour" },
            { id: "opt4", text: "Prévention et éducation, réforme de la prison et alternatives à l'incarcération.", assoc: "melenchon,roussel,tondelier" }
        ]
    },
    {
        id: 'q9_international', theme: "Europe, international et défense", question: "Quelle orientation internationale choisissez-vous ?",
        options: [
            { id: "opt1", text: "Sortie immédiate de l'Union européenne (Frexit) et de l'OTAN.", assoc: "asselineau,philippot,dupont-aignan,lalanne" },
            { id: "opt2", text: "Renforcement européen avec la création d'« États-Unis d'Europe » (fédéralisme économique).", assoc: "attal" },
            { id: "opt3", text: "Soutien massif à l'Ukraine et aide à la résistance face à la Russie.", assoc: "glucksmann" },
            { id: "opt4", text: "Sortie de l'OTAN, stratégie de dialogue et des petits pas avec la Russie.", assoc: "melenchon,royal" }
        ]
    },
    {
        id: 'q10_institutions', theme: "Institutions et démocratie", question: "Quelles réformes institutionnelles souhaitez-vous ?",
        options: [
            { id: "opt1", text: "Référendum d'Initiative Citoyenne (RIC) constituant, législatif et révocatoire.", assoc: "melenchon,roussel,asselineau" },
            { id: "opt2", text: "Réforme de la Constitution pour plus de stabilité et d'efficacité.", assoc: "retailleau,philippe,attal" },
            { id: "opt3", text: "Proportionnelle intégrale aux élections et limitation des mandats.", assoc: "faure,glucksmann,tondelier" },
            { id: "opt4", text: "Renforcement du pouvoir exécutif et référendums sur l'immigration.", assoc: "le-pen,zemmour" }
        ]
    },
    {
        id: 'q11_logement', theme: "Logement", question: "Comment résoudre la crise du logement ?",
        options: [
            { id: "opt1", text: "Construction massive de logements sociaux et encadrement strict des loyers.", assoc: "melenchon,roussel,tondelier" },
            { id: "opt2", text: "Simplification des normes de construction et libéralisation du marché.", assoc: "retailleau,philippe" },
            { id: "opt3", text: "Aides à l'accession à la propriété et réforme de la loi SRU.", assoc: "le-pen,dupont-aignan" },
            { id: "opt4", text: "Lutte contre l'habitat indigne et rénovation énergétique massive.", assoc: "faure,glucksmann,maurel" }
        ]
    },
    {
        id: 'q12_agriculture', theme: "Agriculture, ruralité et services publics locaux", question: "Quelle politique pour l'agriculture et les territoires ?",
        options: [
            { id: "opt1", text: "Soutien à l'agriculture paysanne, financement de la bio et interdiction des pesticides.", assoc: "tondelier,roussel" },
            { id: "opt2", text: "Modernisation de l'agriculture, simplification des normes et soutien à l'innovation.", assoc: "retailleau,philippe,attal" },
            { id: "opt3", text: "Protection des agriculteurs français et souveraineté alimentaire.", assoc: "le-pen,dupont-aignan" },
            { id: "opt4", text: "Maintien des services publics dans les zones rurales et aide aux territoires.", assoc: "faure,glucksmann,maurel" }
        ]
    },
    {
        id: 'q13_societe', theme: "Société et libertés", question: "Quelle position sur les questions de société ?",
        options: [
            { id: "opt1", text: "Extension de l'IVG, PMA pour toutes et GPA encadrée, fin de la pénalisation.", assoc: "tondelier,faure,glucksmann" },
            { id: "opt2", text: "Défense des libertés individuelles mais refus de la GPA.", assoc: "melenchon,roussel" },
            { id: "opt3", text: "Rétablissement de la morale traditionnelle et défense de la famille.", assoc: "zemmour,le-pen" },
            { id: "opt4", text: "Statu quo sur les questions sociétales, priorité à l'économie.", assoc: "retailleau,philippe,attal" }
        ]
    }
];

let quizInitialized = false;

function initQuiz() {
    if (quizInitialized) return;
    const container = document.getElementById('quiz-container');
    
    let html = `
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start mb-8 shadow-sm">
            <i class="fa-solid fa-hand-pointer text-blue-500 mt-1 mr-3 text-xl"></i>
            <div>
                <h4 class="font-bold text-blue-900">Instruction</h4>
                <p class="text-sm text-blue-800 leading-relaxed">Pour chaque thème officiel, glissez-déposez les étiquettes (propositions réelles des candidats) pour les classer de votre préférée (en haut) à celle que vous rejetez le plus (en bas).</p>
            </div>
        </div>
    `;

    QUIZ_DATA.forEach((q, index) => {
        html += `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
            <span class="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase px-2.5 py-1 rounded-full mb-3 tracking-wider">Thème ${index+1} : ${q.theme}</span>
            <h3 class="text-xl font-bold text-gray-900 mb-6">${q.question}</h3>
            
            <div class="flex gap-4">
                <div class="flex flex-col justify-between py-4 text-xs font-bold text-gray-400 uppercase text-right w-16 shrink-0">
                    <span class="text-green-500"><i class="fa-solid fa-heart mr-1"></i> Idéal</span>
                    <span>Acceptable</span>
                    <span>Douteux</span>
                    <span class="text-red-500"><i class="fa-solid fa-ban mr-1"></i> Rejet</span>
                </div>
                <div class="w-1 bg-gray-200 rounded-full my-4 relative shrink-0">
                    <div class="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-green-400 to-transparent rounded-t-full"></div>
                    <div class="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-red-400 to-transparent rounded-b-full"></div>
                </div>
                <ul id="sortable-${q.id}" class="sortable-list flex-grow space-y-3" data-qid="${q.id}">
                    ${q.options.map(opt => `
                        <li class="sortable-item" data-opt="${opt.id}" data-assoc="${opt.assoc}">
                            <span class="sortable-handle"><i class="fa-solid fa-grip-lines"></i></span>
                            <div class="flex-grow text-sm font-medium text-gray-700">${rendreLexiqueInteractif(opt.text)}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        `;
    });

    html += `
        <div class="text-center mt-10 mb-20">
            <button id="btn-resultats" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg">
                <i class="fa-solid fa-wand-magic-sparkles mr-2"></i> Analyser mes convictions
            </button>
        </div>
        <div id="quiz-result" class="mt-8 hidden fade-in"></div>
    `;

    container.innerHTML = html;
    
    QUIZ_DATA.forEach(q => {
        new Sortable(document.getElementById(`sortable-${q.id}`), {
            animation: 200,
            ghostClass: 'sortable-ghost',
            handle: '.sortable-item'
        });
    });
    
    attachLexiqueEvents(container);
    document.getElementById('btn-resultats').addEventListener('click', calculerResultats);
    quizInitialized = true;
}

function calculerResultats() {
    const scores = {};
    const details = {}; // Pour stocker l'explication des choix
    
    openData.candidats.candidats.forEach(c => {
        scores[c.id] = 0;
        details[c.id] = { accords: [], desaccords: [] };
    });

    QUIZ_DATA.forEach(q => {
        const items = document.getElementById(`sortable-${q.id}`).querySelectorAll('.sortable-item');
        const points = [3, 1, -1, -3]; // Pondération
        
        items.forEach((item, index) => {
            const candidatsAssoc = item.getAttribute('data-assoc').split(',');
            const optId = item.getAttribute('data-opt');
            const optText = q.options.find(o => o.id === optId).text;
            const pt = points[index];

            candidatsAssoc.forEach(cid => { 
                if(scores[cid] !== undefined) {
                    scores[cid] += pt; 
                    if(pt > 0) {
                        details[cid].accords.push({ theme: q.theme, text: optText, points: pt });
                    } else {
                        details[cid].desaccords.push({ theme: q.theme, text: optText, points: pt });
                    }
                }
            });
        });
    });

    const sorted = Object.keys(scores)
        .map(id => ({ id, score: scores[id] }))
        .sort((a, b) => b.score - a.score);

    const topMatches = sorted.filter(c => c.score > 0).slice(0, 3);
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('hidden');

    if (topMatches.length === 0) {
        resultDiv.innerHTML = `
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-8 rounded-2xl shadow-xl text-center">
            <i class="fa-solid fa-puzzle-piece text-5xl mb-4 text-purple-500"></i>
            <h3 class="text-2xl font-bold mb-2 text-gray-900">Profil Transversal</h3>
            <p class="text-gray-600 mb-4">Votre pensée politique est éclectique : vous puisez vos idées de manière originale dans plusieurs familles politiques.</p>
            <div class="bg-white rounded-xl p-4 text-sm text-gray-700">
                <p class="font-medium mb-2">Votre répartition par thèmes :</p>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-left">
                    ${QUIZ_DATA.map(q => {
                        const items = document.getElementById(`sortable-${q.id}`).querySelectorAll('.sortable-item');
                        const topItem = items[0];
                        const candidatsAssoc = topItem ? topItem.getAttribute('data-assoc').split(',') : [];
                        const blocs = candidatsAssoc.map(cid => {
                            const c = openData.candidats.candidats.find(cand => cand.id === cid);
                            return c ? BLOCS[c.bloc]?.nom : '';
                        }).filter(Boolean);
                        const uniqueBlocs = [...new Set(blocs)];
                        return `<div class="bg-gray-50 p-2 rounded"><span class="font-bold text-purple-600">${q.theme.split(' ')[0]}:</span> ${uniqueBlocs.join(', ') || 'Divers'}</div>`;
                    }).join('')}
                </div>
            </div>
        </div>`;
        return;
    }

    const c1 = openData.candidats.candidats.find(c => c.id === topMatches[0].id);
    const blocConf = BLOCS[c1.bloc] || BLOCS['autre'];

    // Calculer les scores par bloc politique pour le radar
    const blocScores = {};
    Object.keys(BLOCS).forEach(bloc => blocScores[bloc] = 0);
    topMatches.forEach(m => {
        const c = openData.candidats.candidats.find(cand => cand.id === m.id);
        if (c && c.bloc) {
            blocScores[c.bloc] += m.score;
        }
    });

    // Normaliser pour le radar (max score possible = 3 * nombre de questions)
    const maxPossibleScore = 3 * QUIZ_DATA.length;
    const radarData = Object.keys(BLOCS).map(bloc => ({
        bloc: BLOCS[bloc].nom,
        score: Math.max(0, Math.min(100, (blocScores[bloc] / maxPossibleScore) * 100))
    }));

    let html = `
        <div class="bg-white border-2 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden" style="border-color: ${blocConf.color}">
            <div class="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8">
                <i class="fa-solid fa-check-circle text-9xl" style="color: ${blocConf.color}"></i>
            </div>

            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style="background-color: ${blocConf.color}20; color: ${blocConf.color}">
                Votre Famille Politique Probable
            </span>

            <h3 class="text-3xl font-extrabold text-gray-900 mb-2">Proximité avec <span style="color: ${blocConf.color}">${c1.nom}</span></h3>
            <p class="text-lg text-gray-600 font-medium mb-8">(${c1.parti} • ${blocConf.nom})</p>

            <!-- Graphique Radar -->
            <div class="mb-8">
                <h4 class="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider"><i class="fa-solid fa-chart-radar mr-2"></i>Répartition par famille politique</h4>
                <div class="bg-gray-50 rounded-xl p-4">
                    <canvas id="radarChart" style="max-height: 300px;"></canvas>
                </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-5 mb-6">
                <h4 class="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Top 3 des correspondances :</h4>
                <div class="space-y-4">
    `;

    topMatches.forEach((m, idx) => {
        const c = openData.candidats.candidats.find(cand => cand.id === m.id);
        const progress = Math.max(10, Math.min(100, (m.score / (3 * QUIZ_DATA.length)) * 100)); // Normalisation visuelle
        html += `
            <div>
                <div class="flex justify-between text-sm font-medium mb-1">
                    <span class="text-gray-800">${idx+1}. ${c.nom} <span class="text-gray-400 font-normal">(${c.parti})</span></span>
                    <span class="text-blue-600 font-bold">${m.score} pts</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    });

    html += `
                </div>
            </div>

            <!-- BOUTONS D'ACTIONS -->
            <div class="flex flex-col sm:flex-row gap-3 mt-6 mb-2 relative z-10">
                <button id="btn-toggle-explications" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors border border-gray-300 shadow-sm">
                    <i class="fa-solid fa-magnifying-glass-chart mr-2"></i> En savoir plus
                </button>
                <button id="btn-share-results" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm">
                    <i class="fa-solid fa-share-nodes mr-2"></i> Partager mes résultats
                </button>
            </div>

            <!-- PANNEAU EXPLICATIONS -->
            <div id="explications-panel" class="hidden mt-8 border-t border-gray-200 pt-8">
                <h4 class="text-xl font-bold text-gray-900 mb-6 text-center">Pourquoi ces résultats ?</h4>
    `;

    // Génération des explications pour le top 3
    topMatches.forEach((m, idx) => {
        const c = openData.candidats.candidats.find(cand => cand.id === m.id);
        const detail = details[m.id];
        
        // Trier pour afficher les accords les plus forts (+3) en premier et désaccords (-3) en premier
        detail.accords.sort((a, b) => b.points - a.points);
        detail.desaccords.sort((a, b) => a.points - b.points); // Ascendant pour que -3 soit en haut

        html += `
            <div class="mb-10 last:mb-0">
                <h5 class="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                    <span class="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">${idx+1}</span>
                    Détails pour ${c.nom}
                </h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Colonne Accords -->
                    <div class="bg-green-50/50 border border-green-200 rounded-xl p-5 shadow-sm">
                        <h6 class="font-bold text-green-800 mb-4 flex items-center">
                            <i class="fa-solid fa-handshake text-green-600 mr-2 text-lg"></i> Ce qui vous rapproche
                        </h6>
                        <ul class="space-y-4 text-sm">
                            ${detail.accords.length > 0 ? detail.accords.map(a => `
                                <li class="flex items-start">
                                    <span class="bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded text-xs mr-3 mt-0.5 shrink-0">+${a.points}</span>
                                    <div>
                                        <span class="block text-xs font-bold text-green-700 uppercase mb-1 tracking-wider">${a.theme}</span>
                                        <span class="text-gray-700 leading-snug">« ${a.text} »</span>
                                    </div>
                                </li>
                            `).join('') : `<li class="text-gray-500 italic text-center py-4">Peu de points de convergence forts sur les thèmes abordés.</li>`}
                        </ul>
                    </div>
                    
                    <!-- Colonne Désaccords -->
                    <div class="bg-red-50/50 border border-red-200 rounded-xl p-5 shadow-sm">
                        <h6 class="font-bold text-red-800 mb-4 flex items-center">
                            <i class="fa-solid fa-bolt text-red-600 mr-2 text-lg"></i> Ce qui vous éloigne
                        </h6>
                        <ul class="space-y-4 text-sm">
                            ${detail.desaccords.length > 0 ? detail.desaccords.map(d => `
                                <li class="flex items-start">
                                    <span class="bg-red-200 text-red-800 font-bold px-2 py-0.5 rounded text-xs mr-3 mt-0.5 shrink-0">${d.points}</span>
                                    <div>
                                        <span class="block text-xs font-bold text-red-700 uppercase mb-1 tracking-wider">${d.theme}</span>
                                        <span class="text-gray-700 leading-snug">« ${d.text} »</span>
                                    </div>
                                </li>
                            `).join('') : `<li class="text-gray-500 italic text-center py-4">Aucun désaccord majeur identifié sur les thèmes testés.</li>`}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div> <!-- fin explications-panel -->
        </div>
    `;

    resultDiv.innerHTML = html;

    // Initialiser le graphique Radar
    const ctx = document.getElementById('radarChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: radarData.map(d => d.bloc),
                datasets: [{
                    label: 'Affinité politique',
                    data: radarData.map(d => d.score),
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            font: { size: 10 }
                        },
                        pointLabels: {
                            font: { size: 11, weight: 'bold' }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Attacher l'événement au bouton d'explications
    const btnExplications = document.getElementById('btn-toggle-explications');
    const panelExplications = document.getElementById('explications-panel');

    btnExplications.addEventListener('click', () => {
        const isHidden = panelExplications.classList.contains('hidden');
        if (isHidden) {
            panelExplications.classList.remove('hidden');
            panelExplications.classList.add('fade-in');
            btnExplications.innerHTML = '<i class="fa-solid fa-chevron-up mr-2"></i> Masquer les détails';
        } else {
            panelExplications.classList.add('hidden');
            panelExplications.classList.remove('fade-in');
            btnExplications.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart mr-2"></i> En savoir plus';
        }
    });

    // Attacher l'événement au bouton de partage
    const btnShare = document.getElementById('btn-share-results');
    btnShare.addEventListener('click', () => {
        const shareText = `🗳️ Ma Boussole Présidentielle 2027\n\n` +
            `Candidat le plus proche : ${c1.nom} (${c1.parti})\n` +
            `Famille politique : ${blocConf.nom}\n\n` +
            `Top 3 des correspondances :\n` +
            topMatches.map((m, idx) => {
                const c = openData.candidats.candidats.find(cand => cand.id === m.id);
                return `${idx + 1}. ${c.nom} (${c.parti}) - ${m.score} pts`;
            }).join('\n') +
            `\n\n📊 Découvrez votre profil sur 2027 & Moi`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                btnShare.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Copié !';
                btnShare.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                btnShare.classList.add('bg-green-600', 'hover:bg-green-700');
                setTimeout(() => {
                    btnShare.innerHTML = '<i class="fa-solid fa-share-nodes mr-2"></i> Partager mes résultats';
                    btnShare.classList.remove('bg-green-600', 'hover:bg-green-700');
                    btnShare.classList.add('bg-blue-600', 'hover:bg-blue-700');
                }, 2000);
            }).catch(err => {
                alert('Erreur lors de la copie. Veuillez réessayer.');
            });
        } else {
            // Fallback pour les navigateurs plus anciens
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            btnShare.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Copié !';
            setTimeout(() => {
                btnShare.innerHTML = '<i class="fa-solid fa-share-nodes mr-2"></i> Partager mes résultats';
            }, 2000);
        }
    });

    // Scroll fluide vers le résultat
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Lancement manuel au chargement
// (les écouteurs DOMContentLoaded gèrent le premier affichage)
