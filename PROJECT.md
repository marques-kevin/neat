# Neat Competitor — Document de référence

> Application desktop de gestion intelligente des notifications de développement (GitHub, Linear, et au-delà).  
> Objectif : concurrencer [Neat](https://neat.run/) en offrant une expérience plus ouverte, plus rapide et plus personnalisable.

---

## Table des matières

1. [Vision](#1-vision)
2. [Problème & opportunité](#2-problème--opportunité)
3. [Analyse concurrentielle](#3-analyse-concurrentielle)
4. [Positionnement](#4-positionnement)
5. [Utilisateurs cibles](#5-utilisateurs-cibles)
6. [Fonctionnalités](#6-fonctionnalités)
7. [Clean Architecture](#7-clean-architecture)
8. [Stack & monorepo](#8-stack--monorepo)
9. [Modèle de données](#9-modèle-de-données)
10. [Roadmap](#10-roadmap)
11. [Monétisation](#11-monétisation)
12. [Métriques de succès](#12-métriques-de-succès)
13. [Risques & mitigations](#13-risques--mitigations)
14. [Décisions ouvertes](#14-décisions-ouvertes)
15. [Internationalisation (i18n)](#15-internationalisation-i18n)
16. [Étape 1 — In-memory + Redux](#16-étape-1--in-memory--redux)

---

## 1. Vision

**Transformer le bruit des notifications en signal actionnable**, pour que les développeurs passent moins de temps à réagir et plus de temps à construire.

Neat a prouvé le marché : une app légère dans la barre de menu macOS, centrée sur les PR GitHub et les tickets Linear, avec triage en un clic ou raccourci clavier. Notre ambition est de reprendre cette promesse et d'aller plus loin :

- **Open source** — transparence, confiance, contributions communautaires
- **Cross-platform** — macOS, Windows, Linux dès le MVP
- **Multi-forge** — GitHub en priorité, puis GitLab, Linear, et autres outils dev
- **Intelligence configurable** — filtres opinionnés par défaut, personnalisables à l'infini
- **Privacy-first** — données stockées localement, chiffrement au repos, zéro tracking
- **Multilingue** — interface traduite (react-intl), langue détectée automatiquement, modifiable par l'utilisateur
- **Clean Architecture** — core métier isolé, boundaries strictes, multi-plateforme (desktop + web) sans duplication

---

## 2. Problème & opportunité

### Le problème

Les équipes de développement utilisent GitHub (et Linear, Sentry, Notion…) comme outils opérationnels. Les notifications de ces outils déclenchent du **travail réactif** :

- Répondre à un commentaire de PR
- Approuver ou demander des changements sur une review
- Trier un ticket assigné
- Réagir à une alerte de sécurité Dependabot

Le flux par défaut (email GitHub, onglet notifications, Slack) crée une **surcharge informationnelle**. On rate les reviews importantes tout en étant noyé sous les commentaires sur des threads auxquels on ne participe plus.

### Ce que Neat fait bien

| Capacité              | Détail                                                      |
| --------------------- | ----------------------------------------------------------- |
| Curation intelligente | Pings pour @mentions, review requests, assignments, merges  |
| Triage rapide         | Preview, dismiss, open en un clic ou raccourci              |
| Menu bar native       | Toujours accessible, raccourci global (`⌘` + `` ` `` + `G`) |
| Actions fines         | Read/unread, pin, archive, copier le lien, quick reply      |
| Privacy               | Tout stocké localement                                      |
| Intégrations          | GitHub + Linear                                             |
| Gratuit               | $0 avec plan Believer optionnel à $5/mois                   |

### L'opportunité

Neat est **macOS-only**, **fermé**, et encore jeune (~871 installs GitHub Marketplace). Les alternatives ouvertes (Gitify) manquent de curation intelligente. Les alternatives filtrantes (Octobox, DevHub) vivent dans le navigateur et demandent plus de configuration.

**Notre angle d'attaque** : combiner la simplicité opinionnée de Neat avec l'ouverture et le cross-platform de Gitify.

---

## 3. Analyse concurrentielle

### Carte des concurrents

| Produit                                 | Type                | Plateforme        | Open source | Force principale                       | Faiblesse                                              |
| --------------------------------------- | ------------------- | ----------------- | ----------- | -------------------------------------- | ------------------------------------------------------ |
| **[Neat](https://neat.run/)**           | Menu bar            | macOS             | Non         | UX minimaliste, curation, Linear       | macOS only, fermé                                      |
| **[Gitify](https://gitify.io/)**        | Menu bar / tray     | macOS, Win, Linux | Oui (MIT)   | Multi-forge, cross-platform            | Pas de curation intelligente, focus "nouvelles notifs" |
| **[Octobox](https://octobox.io/)**      | Web app             | Browser           | Oui         | Filtres avancés (repo, author, status) | Vit dans un onglet, setup manuel                       |
| **[DevHub](https://devhubapp.com/)**    | Desktop / mobile    | Cross-platform    | Non         | Multi-colonnes type TweetDeck          | Interface lourde, pas menu bar                         |
| **[GitPigeon](https://gitpigeon.com/)** | Notification Center | macOS             | Non         | Algorithme de priorisation             | macOS Notification Center only                         |
| **[Lotus](https://lotus.io/)**          | Desktop             | macOS             | Non         | Screening inbox (style Hey.com)        | macOS only, niche                                      |
| **Slack / Email**                       | Intégration         | Partout           | N/A         | Déjà adopté par l'équipe               | Bruit, pas de triage natif                             |

### Matrice de différenciation (cible)

```
                    Simplicité ──────────────────► Puissance filtrage
                         │
    Neat ●               │          ● Octobox
    (notre cible) ●      │
                         │    ● DevHub
    Gitify ●             │
                         │
                         ▼
                    Cross-platform
```

---

## 4. Positionnement

### Tagline

> **"Stay focused. Ship faster."**  
> Notifications dev intelligentes dans votre barre de menu.

### Proposition de valeur (1 phrase)

Une app desktop open source qui ne vous ping que quand votre action est requise — PR reviews, mentions, assignments — avec triage en un raccourci clavier, sans quitter votre flow.

### Principes produit

1. **Opinionated by default, customizable forever** — fonctionne out-of-the-box, se configure si besoin
2. **Keyboard-first** — chaque action principale a un raccourci
3. **Local-first** — données sur la machine, sync cloud optionnelle plus tard
4. **Do one thing well** — gestion de notifications, pas un client GitHub complet
5. **Respect the user's focus** — ne pas notifier = feature, pas un bug

---

## 5. Utilisateurs cibles

### Persona 1 — Le développeur IC

- 5–20 PRs/semaine en review ou auteur
- Utilise GitHub daily, parfois Linear
- Frustré par les emails GitHub et les pings Slack
- Veut traiter ses notifications en 5 min le matin

### Persona 2 — Le tech lead / EM

- Review beaucoup de PRs d'équipe
- Doit prioriser : security alerts > review requests > mentions > CI failures
- Veut pin/archiver pour ne pas perdre de vue les items critiques

### Persona 3 — Le contributeur open source

- Notifications sur des dizaines de repos
- Besoin de filtres par org/repo et de muting granulaire
- Sensible à la privacy et à l'open source

---

## 6. Fonctionnalités

### 6.1 MVP (v0.1 — "Ship the core loop")

Objectif : boucle complète **fetch → triage → action** pour GitHub.

#### Authentification

- [ ] OAuth GitHub (App ou OAuth App)
- [ ] Support multi-comptes GitHub
- [ ] Token stocké de façon sécurisée (Keychain macOS, libsecret Linux, Credential Manager Windows)

#### Notifications

- [ ] Polling GitHub Notifications API (intervalle configurable, défaut 60s)
- [ ] Affichage dans menu bar / system tray avec badge count
- [ ] Liste des notifications non lues, triées par priorité
- [ ] Preview inline (titre, repo, type, extrait)

#### Curation (filtres opinionnés par défaut)

- [ ] **Priorité haute** : review requests, assignments, @mentions, security alerts
- [ ] **Priorité moyenne** : commentaires sur PRs où l'utilisateur est impliqué
- [ ] **Priorité basse / muted** : CI checks, star/fork, threads auxquels on ne participe plus
- [ ] Toggle rapide "Focus mode" : ne montrer que priorité haute

#### Actions

- [ ] Mark as read / unread
- [ ] Open in browser
- [ ] Copy link
- [ ] Dismiss / archive
- [ ] Pin (reste en haut de la liste)

#### Notifications OS

- [ ] Bannière native pour items priorité haute uniquement
- [ ] Actions rapides sur la bannière (open, dismiss, copy link)
- [ ] Respect du Do Not Disturb OS

#### Raccourcis clavier

- [ ] Raccourci global pour ouvrir/fermer le panel (défaut : `⌘⇧G` / `Ctrl+Shift+G`)
- [ ] Navigation ↑↓ dans la liste
- [ ] Enter = open, `R` = mark read, `U` = unread, `P` = pin, `D` = dismiss, `C` = copy link
- [ ] `Esc` = fermer

#### Stockage local

- [ ] **Phase 1** : repositories **in-memory** (itération rapide, zéro setup DB)
- [ ] **Phase 2+** : SQLite (desktop) / IndexedDB (web) — swap transparent via ports
- [ ] Aucune donnée envoyée à un serveur tiers

#### Internationalisation

- [ ] UI multilingue via **react-intl** (`react-intl` + `@formatjs/intl`)
- [ ] Détection automatique de la langue au premier lancement (`navigator.language` / locales système)
- [ ] Sélecteur de langue dans les Settings (override manuel)
- [ ] Préférence persistée localement (`locale` dans `preferences`)
- [ ] Langues MVP : **en**, **fr** — extensible via fichiers JSON par locale

#### Plateformes MVP

- [ ] macOS (Apple Silicon + Intel)
- [ ] Windows
- [ ] Linux (AppImage ou .deb)

---

### 6.2 v0.2 — "Power user"

- [ ] Filtres personnalisables (par repo, org, type, label)
- [ ] Règles de notification custom (if/then)
- [ ] Quick reply sur commentaires PR (via GitHub API)
- [ ] Snooze notification (reapparaît dans X heures)
- [ ] Historique des notifications archivées (7 jours)
- [ ] Thèmes clair / sombre / système
- [ ] Import/export des préférences

---

### 6.3 v0.3 — "Multi-tool"

- [ ] Intégration **Linear** (issues assignées, mentions, commentaires)
- [ ] Intégration **GitLab** (merge requests, mentions)
- [ ] Feed unifié multi-source avec filtres par source
- [ ] Adapter pattern par forge (inspiré de Gitify)

---

### 6.4 v1.0 — "Team & scale"

- [ ] Intégration **Sentry** (nouvelles issues assignées)
- [ ] Intégration **Slack** (optionnel : forwarder des notifs vers un channel)
- [ ] Mode équipe : partage de filtres/règles entre membres
- [ ] Statistiques personnelles (temps de réponse moyen aux reviews, notifs traitées/jour)
- [ ] Auto-update (electron-updater)
- [ ] **App web** (onboarding, settings, historique) — shell `packages/web`
- [ ] Site web + page de téléchargement

---

### 6.5 Stratégie multi-plateforme

| Surface                | Phase | Rôle                                                               |
| ---------------------- | ----- | ------------------------------------------------------------------ |
| **Desktop** (Tauri)    | MVP   | Produit principal — menu bar, notifs OS, raccourcis globaux        |
| **Landing** (statique) | MVP   | Marketing, download, docs                                          |
| **Web app** (React)    | v1.0  | Complément — onboarding sans install, settings avancés, historique |

Le **core métier** (`packages/core`) est partagé entre desktop et web. Seuls les adapters plateforme (stockage, notifs OS, auth redirect) diffèrent.

---

### 6.6 Hors scope (explicitement)

- Client GitHub complet (création de PR, éditeur de code)
- Gestion de repos / CI/CD
- Remplacement de Slack ou email
- Mobile (déléguer à l'app GitHub mobile officielle)

---

## 7. Clean Architecture

### Décision

Architecture en **couches concentriques** avec **dependency inversion** : le domaine ne dépend de rien, l'application ne dépend que du domaine, l'infrastructure implémente les ports définis par l'application, la présentation consomme les use cases.

Objectif : ajouter une forge, une plateforme (web) ou remplacer SQLite par Postgres **sans toucher au domaine**.

### Règle de dépendance

```
                    ┌─────────────────────────────────┐
                    │         Presentation            │
                    │  (React, Tauri shell, hooks)    │
                    └───────────────┬─────────────────┘
                                    │ appelle
                                    ▼
                    ┌─────────────────────────────────┐
                    │         Application             │
                    │     (Use Cases + Ports)         │
                    └───────────────┬─────────────────┘
                                    │ utilise
                                    ▼
                    ┌─────────────────────────────────┐
                    │            Domain               │
                    │   (Entities, Value Objects)     │
                    └─────────────────────────────────┘
                                    ▲
                                    │ implémente
                    ┌───────────────┴─────────────────┐
                    │        Infrastructure           │
                    │  (Adapters: API, DB, OS, Auth)  │
                    └─────────────────────────────────┘
```

**Les flèches de code pointent toujours vers l'intérieur.** L'infrastructure importe les ports de l'application, jamais l'inverse.

### Couches

#### Domain (cœur — zéro dépendance externe)

Entités et règles métier pures. Pas de React, pas de fetch, pas de SQLite.

```
packages/core/src/domain/
  entities/
    Notification.ts
    Account.ts
    PriorityRule.ts
  value-objects/
    NotificationId.ts
    ForgeType.ts
    PriorityScore.ts
    Locale.ts
  errors/
    DomainError.ts
    NotificationNotFoundError.ts
  services/
    PriorityScorer.ts       # logique pure de scoring
```

```typescript
// Exemple — entité domain pure
export class Notification {
  constructor(
    readonly id: NotificationId,
    readonly forge: ForgeType,
    readonly title: string,
    readonly url: string,
    readonly reason: NotificationReason,
    private _state: NotificationState,
    readonly priorityScore: PriorityScore,
  ) {}

  markAsRead(): void {
    this._state = this._state.markAsRead();
  }

  pin(): void {
    this._state = this._state.pin();
  }

  get isActionRequired(): boolean {
    return this.priorityScore.value >= 80;
  }
}
```

#### Application (use cases + ports)

Orchestre le domaine. Définit les **interfaces (ports)** que l'infrastructure doit implémenter.

```
packages/core/src/application/
  ports/
    INotificationRepository.ts
    IForgeAdapter.ts
    ITokenStore.ts
    IPreferencesStore.ts
    IOsNotificationService.ts
    IClock.ts
  use-cases/
    SyncNotifications.ts
    MarkAsRead.ts
    MarkAsUnread.ts
    PinNotification.ts
    ArchiveNotification.ts
    GetNotificationFeed.ts
    UpdatePriorityRules.ts
    SetLocale.ts
  dto/
    NotificationFeedItem.ts     # output pour la présentation
  mappers/
    NotificationMapper.ts       # Entity → DTO
```

```typescript
// Port — défini par l'application, implémenté par l'infrastructure
export interface IForgeAdapter {
  readonly forge: ForgeType;
  fetchNotifications(since?: Date): Promise<Notification[]>;
  markAsRead(id: NotificationId): Promise<void>;
  markAsDone(id: NotificationId): Promise<void>;
  getCapabilities(): ForgeCapabilities;
}

// Use case — dépend uniquement des ports et du domaine
export class SyncNotifications {
  constructor(
    private readonly forges: IForgeAdapter[],
    private readonly repository: INotificationRepository,
    private readonly scorer: PriorityScorer,
    private readonly clock: IClock,
  ) {}

  async execute(): Promise<SyncResult> {
    const since = await this.repository.getLastSyncTime();
    const raw = await Promise.all(this.forges.map((f) => f.fetchNotifications(since)));
    const scored = raw.flat().map((n) => this.scorer.score(n));
    await this.repository.upsertMany(scored);
    return { count: scored.length, syncedAt: this.clock.now() };
  }
}
```

#### Infrastructure (adapters)

Implémentations concrètes des ports. Toute dépendance externe vit ici.

```
packages/infrastructure/src/
  in-memory/                    # ◄── Étape 1 (défaut)
    InMemoryNotificationRepository.ts
    InMemoryPreferencesStore.ts
    InMemoryTokenStore.ts
    InMemoryOsNotificationService.ts
    FakeGitHubForgeAdapter.ts   # seed data pour dev sans API
  forges/
    github/
      GitHubForgeAdapter.ts     # Phase 2 — API réelle
      GitHubApiClient.ts
      GitHubNotificationMapper.ts
    linear/
      LinearForgeAdapter.ts
    gitlab/
      GitLabForgeAdapter.ts
  persistence/
    sqlite/                     # Phase 2+
      SqliteNotificationRepository.ts
      SqlitePreferencesStore.ts
      migrations/
  auth/
    TauriTokenStore.ts          # Phase 2 — Keychain via Tauri
    WebTokenStore.ts
  platform/
    desktop/
      TauriOsNotificationService.ts
      TauriGlobalShortcutService.ts
    web/
      BrowserNotificationService.ts
  di/
    createInMemoryContainer.ts  # ◄── Étape 1
    createDesktopContainer.ts   # Phase 2
    createWebContainer.ts       # Phase 4
```

#### Presentation — Redux + composants dumb

La présentation est scindée en **3 sous-couches strictes** :

```
packages/store/                 # @app/store — orchestration front
  slices/
    notificationsSlice.ts       # état view + async (RTK)
    settingsSlice.ts
    uiSlice.ts                  # focus mode, panel open, selection
  thunks/
    syncNotificationsThunk.ts   # dispatch → use case → reducer
    markAsReadThunk.ts
  selectors/
    notificationFeedSelector.ts # DTO → props pour les composants
  store.ts
  AppContainerContext.ts        # injecte le DI container dans les thunks

packages/ui/src/
  components/                   # ◄── 100% DUMB — props + callbacks uniquement
    NotificationList/
      NotificationList.tsx
      NotificationList.types.ts
    NotificationItem/
    SettingsPanel/
    EmptyState/
  containers/                   # ◄── SMART — connecte Redux → props
    NotificationListContainer.tsx
    SettingsPanelContainer.tsx
  i18n/
  providers/
    StoreProvider.tsx
    IntlProvider.tsx

packages/desktop/src/           # shell Tauri (Phase 2+)
packages/web/src/               # shell Vite — ◄── Étape 1 (dev rapide)
```

**Règle absolue** : aucun fichier dans `components/` n'importe Redux, les use cases, ni l'infrastructure. ESLint enforced.

##### Responsabilités par couche

| Couche                      | Rôle                                                        | Imports autorisés                  |
| --------------------------- | ----------------------------------------------------------- | ---------------------------------- |
| `@app/core`                 | Domaine + use cases                                         | Rien d'externe                     |
| `@app/infrastructure`       | Adapters (in-memory → SQLite → API)                         | `@app/core`                        |
| `@app/store`                | Thunks appellent les use cases, slices tiennent l'état view | `@app/core`                        |
| `@app/ui/components`        | Rendu pur — props in, events out                            | React, Tailwind, react-intl        |
| `@app/ui/containers`        | `useSelector` + `useDispatch` → mappe en props              | `@app/store`, `@app/ui/components` |
| `@app/desktop` / `@app/web` | Boot app, wiring DI container, mount providers              | tout sauf `@app/core` direct       |

##### Flux de données

```
User click (dumb component)
       │ onMarkAsRead(id)
       ▼
Container dispatch(markAsReadThunk(id))
       │
       ▼
Thunk → container.markAsRead.execute(id)    ← use case (@app/core)
       │
       ▼
InMemoryNotificationRepository.update()     ← adapter (@app/infrastructure)
       │
       ▼
Thunk fulfilled → notificationsSlice updated
       │
       ▼
Selector → Container re-render → props → Dumb component
```

##### Exemple — composant dumb (100% présentation)

```typescript
// packages/ui/src/components/NotificationItem/NotificationItem.tsx
export interface NotificationItemProps {
  title: string;
  repo: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
  isPinned: boolean;
  onOpen: () => void;
  onMarkAsRead: () => void;
  onPin: () => void;
}

export function NotificationItem({
  title, repo, priority, isRead, isPinned,
  onOpen, onMarkAsRead, onPin,
}: NotificationItemProps) {
  return (
    <div className={cn('flex gap-2 p-2', isRead && 'opacity-60')}>
      <PriorityBadge priority={priority} />
      <button onClick={onOpen} className="flex-1 text-left">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{repo}</span>
      </button>
      <Button variant="ghost" onClick={onMarkAsRead}>✓</Button>
      <Button variant="ghost" onClick={onPin}>{isPinned ? '📌' : '○'}</Button>
    </div>
  );
}
```

##### Exemple — container (seul endroit Redux)

```typescript
// packages/ui/src/containers/NotificationListContainer.tsx
export function NotificationListContainer() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectNotificationFeed);
  const { formatMessage } = useIntl();

  if (items.length === 0) {
    return (
      <EmptyState
        title={formatMessage({ id: 'notifications.empty' })}
        description={formatMessage({ id: 'notifications.empty.description' })}
      />
    );
  }

  return (
    <NotificationList
      items={items}
      onOpen={(id) => dispatch(openNotificationThunk(id))}
      onMarkAsRead={(id) => dispatch(markAsReadThunk(id))}
      onPin={(id) => dispatch(pinNotificationThunk(id))}
    />
  );
}
```

##### Exemple — thunk (pont Redux → use case)

```typescript
// packages/store/src/thunks/markAsReadThunk.ts
export const markAsReadThunk = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { extra }) => {
    const { markAsRead } = extra.container; // DI container injecté au store
    await markAsRead.execute({ id: NotificationId.create(id) });
  },
);
```

> **Pas de TanStack Query** — Redux Toolkit (`createAsyncThunk` + slices) gère l'état async. Un seul outil de state, boundaries claires.

### Monorepo — structure des packages

```
neat-competitor/
├── packages/
│   ├── core/                   # @app/core — domain + application (ports + use cases)
│   ├── infrastructure/         # @app/infrastructure — adapters (in-memory d'abord)
│   ├── store/                  # @app/store — Redux Toolkit (thunks → use cases)
│   ├── ui/                     # @app/ui — dumb components + containers
│   ├── desktop/                # @app/desktop — shell Tauri (Phase 2)
│   └── web/                    # @app/web — shell Vite (Étape 1 — dev rapide)
├── apps/
│   └── landing/                # site statique (Astro ou Vite)
├── pnpm-workspace.yaml
├── turbo.json                  # build pipeline
└── tsconfig.base.json          # paths aliases partagés
```

### Dépendances entre packages

```
@app/desktop  ──►  @app/ui  ──►  @app/store  ──►  @app/core
       │                │              │
       └──►  @app/infrastructure  ─────┘

@app/web  ──►  @app/ui  ──►  @app/store  ──►  @app/core
     │              │              │
     └──►  @app/infrastructure  ──┘
```

| Package               | Peut importer                                  | Ne peut PAS importer                                    |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `@app/core`           | Rien d'externe (sauf utils pures)              | `@app/infrastructure`, `@app/store`, `@app/ui`, React   |
| `@app/infrastructure` | `@app/core`                                    | `@app/store`, `@app/ui`, `@app/desktop`, `@app/web`     |
| `@app/store`          | `@app/core`                                    | `@app/infrastructure`, `@app/ui`, React                 |
| `@app/ui/components`  | React, Tailwind, react-intl, shadcn            | `@app/store`, `@app/core`, `@app/infrastructure`, Redux |
| `@app/ui/containers`  | `@app/store`, `@app/ui/components`, react-intl | `@app/infrastructure`, `@app/core` (direct)             |
| `@app/desktop`        | `@app/ui`, `@app/store`, `@app/infrastructure` | —                                                       |
| `@app/web`            | `@app/ui`, `@app/store`, `@app/infrastructure` | Tauri APIs                                              |

### Enforcement des boundaries

```json
// .eslintrc — eslint-plugin-boundaries
{
  "rules": {
    "boundaries/element-types": [
      "error",
      {
        "default": "disallow",
        "rules": [
          { "from": "core", "allow": [] },
          { "from": "infrastructure", "allow": ["core"] },
          { "from": "store", "allow": ["core"] },
          { "from": "ui-components", "allow": [] },
          { "from": "ui-containers", "allow": ["store", "ui-components"] },
          {
            "from": "desktop",
            "allow": ["ui-containers", "ui-components", "store", "infrastructure", "core"]
          },
          {
            "from": "web",
            "allow": ["ui-containers", "ui-components", "store", "infrastructure", "core"]
          }
        ]
      }
    ]
  }
}
```

- tests CI qui vérifient qu'aucun import interdit n'existe (`dependency-cruiser`).

### Injection de dépendances

Pas de framework DI lourd. **Factory functions** par phase/plateforme :

```typescript
// packages/infrastructure/src/di/createInMemoryContainer.ts — Étape 1
export function createInMemoryContainer() {
  const repository = new InMemoryNotificationRepository();
  const preferences = new InMemoryPreferencesStore();
  const github = new FakeGitHubForgeAdapter(); // seed data
  const osNotifications = new InMemoryOsNotificationService();
  const scorer = new PriorityScorer(DEFAULT_RULES);

  return {
    syncNotifications: new SyncNotifications([github], repository, scorer, systemClock),
    markAsRead: new MarkAsRead(repository, github),
    getNotificationFeed: new GetNotificationFeed(repository),
    setLocale: new SetLocale(preferences),
    osNotifications,
  };
}

// packages/infrastructure/src/di/createDesktopContainer.ts — Phase 2
export function createDesktopContainer(dbPath: string) {
  const db = openSqlite(dbPath);
  const tokenStore = new TauriTokenStore();
  const github = new GitHubForgeAdapter(tokenStore);
  const repository = new SqliteNotificationRepository(db);
  // ... même use cases, adapters différents
}
```

Le container est injecté dans le Redux store via `configureStore({ middleware, preloadedState, ... extra: { container } })`.

### Priority Engine (domain service)

Logique pure dans le domaine — testable sans mock :

```typescript
// packages/core/src/domain/services/PriorityScorer.ts
export class PriorityScorer {
  constructor(private readonly rules: PriorityRule[]) {}

  score(notification: Notification): Notification {
    const matchingRule = this.rules
      .filter((r) => r.matches(notification))
      .sort((a, b) => b.score - a.score)[0];

    return notification.withPriority(matchingRule?.score ?? DEFAULT_SCORE);
  }
}
```

Règles par défaut (non supprimables, désactivables) :

| Règle                               | Score | OS Notify |
| ----------------------------------- | ----- | --------- |
| Security alert (Dependabot, CodeQL) | 100   | Oui       |
| Review requested                    | 90    | Oui       |
| Assigned to you                     | 85    | Oui       |
| @mention                            | 80    | Oui       |
| Comment on your PR                  | 60    | Non       |
| CI check failed on your PR          | 50    | Non       |
| Star / fork / watch                 | 10    | Non       |

### Forge Adapter (port)

Chaque forge est un adapter interchangeable :

```typescript
export interface ForgeCapabilities {
  markAsRead: boolean;
  markAsDone: boolean;
  quickReply: boolean;
  unsubscribe: boolean;
  enrichedPreview: boolean;
}
```

Ajouter GitLab = implémenter `IForgeAdapter` + mapper API → entité domain. **Zéro changement** dans les use cases ou la UI.

### Tests par couche

| Couche         | Type               | Exemple                                               |
| -------------- | ------------------ | ----------------------------------------------------- |
| Domain         | Unit tests purs    | `PriorityScorer` scoring, `Notification.markAsRead()` |
| Application    | Unit + mocks ports | `SyncNotifications` avec fake repository              |
| Infrastructure | Integration        | `GitHubForgeAdapter` contre API mock/fixtures         |
| UI             | Component tests    | `NotificationList` avec container mocké               |
| E2E            | Playwright         | Flow complet desktop                                  |

Objectif couverture : **> 80% sur `@app/core`**, le reste pragmatique.

### Ce que Clean Architecture facilite concrètement

| Besoin                               | Changement                                               |
| ------------------------------------ | -------------------------------------------------------- |
| Ajouter Linear                       | `LinearForgeAdapter` dans infrastructure                 |
| App web v1.0                         | `packages/web` + `createWebContainer()`                  |
| Remplacer SQLite par IndexedDB (web) | `IndexedDbNotificationRepository`                        |
| Tests sans réseau                    | Mock des ports dans les use cases                        |
| CI sans Tauri                        | Tester `@app/core` + `@app/infrastructure` seuls         |
| Sync cloud plus tard                 | Nouveau port `ISyncService`, use case `PushLocalChanges` |

---

## 8. Stack & monorepo

### Stack recommandée

| **Monorepo** | pnpm workspaces + Turborepo | Boundaries par package, build incrémental |
| **Boundaries** | eslint-plugin-boundaries + dependency-cruiser | Enforcement CI des imports inter-packages |
| **Tests** | Vitest + Playwright | Unit (core) + E2E (desktop) |
| **State front** | Redux Toolkit | Thunks → use cases, slices = état view, selectors = props |
| **Runtime desktop** | [Tauri 2](https://tauri.app/) | Phase 2 — Étape 1 via shell web Vite |
| **Runtime web** | Vite + React | **Étape 1** — itération rapide sans Tauri |
| **Frontend** | React + TypeScript | Composants 100% dumb + containers Redux |
| **Styling** | Tailwind CSS + shadcn/ui | Rapidité de dev, composants accessibles |
| **i18n** | [react-intl](https://formatjs.io/docs/react-intl/) | Standard React i18n, ICU messages, pluriels & formats natifs |
| **Persistance** | In-memory (Étape 1) → SQLite / IndexedDB (Phase 2+) | Swap via ports, zéro changement use cases |
| **GitHub API** | Octokit (`@octokit/rest`) | Scoped à `GitHubForgeAdapter` dans infrastructure |
| **Build & CI** | GitHub Actions + Turborepo | Build parallèle des packages, tests core sans Tauri |
| **Packaging** | Tauri bundler | DMG, MSI, AppImage, .deb |

> **Décision** : Tauri 2 pour desktop. Le core TypeScript est agnostique — swap possible vers Electron sans toucher `@app/core`.

### Vue d'ensemble multi-plateforme

```
┌──────────────────────────────────────────────────────────────────┐
│              @app/web (Vite) — Étape 1  │  @app/desktop — Ph.2  │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                     @app/ui                                       │
│  containers (smart) ──► components (100% dumb) · react-intl       │
└────────────────────────────┬─────────────────────────────────────┘
                             │ dispatch / select
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                     @app/store (Redux Toolkit)                    │
│  thunks ──► use cases · slices · selectors                       │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                          @app/core                                │
│  domain entities · use cases · ports (interfaces)                 │
└────────────────────────────▲─────────────────────────────────────┘
                             │ implements
┌────────────────────────────┴─────────────────────────────────────┐
│                     @app/infrastructure                           │
│  in-memory (Étape 1) → SQLite / GitHub API (Phase 2+)            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 9. Modèle de données

> **Étape 1** : pas de SQL — les entités domain vivent en mémoire via `InMemoryNotificationRepository`.  
> Le schéma ci-dessous est la **cible Phase 2+** (SQLite / IndexedDB).

### Entités principales

```sql
-- Comptes connectés
CREATE TABLE accounts (
  id          TEXT PRIMARY KEY,
  forge       TEXT NOT NULL,        -- 'github' | 'linear' | 'gitlab'
  username    TEXT NOT NULL,
  avatar_url  TEXT,
  token_ref   TEXT NOT NULL,        -- ref to secure storage, not the token itself
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
  id              TEXT PRIMARY KEY,  -- forge-specific ID
  account_id      TEXT REFERENCES accounts(id),
  forge           TEXT NOT NULL,
  type            TEXT NOT NULL,     -- 'pull_request', 'issue', 'commit', etc.
  reason          TEXT,              -- GitHub reason field
  title           TEXT NOT NULL,
  body_preview    TEXT,
  url             TEXT NOT NULL,
  repo_full_name  TEXT,
  author          TEXT,
  priority_score  INTEGER DEFAULT 0,
  is_read         BOOLEAN DEFAULT FALSE,
  is_pinned       BOOLEAN DEFAULT FALSE,
  is_archived     BOOLEAN DEFAULT FALSE,
  is_snoozed      BOOLEAN DEFAULT FALSE,
  snoozed_until   DATETIME,
  fetched_at      DATETIME NOT NULL,
  updated_at      DATETIME NOT NULL,
  raw_payload     TEXT               -- JSON blob for forge-specific data
);

-- Règles de priorité custom
CREATE TABLE priority_rules (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  conditions  TEXT NOT NULL,       -- JSON
  score       INTEGER NOT NULL,
  actions     TEXT NOT NULL,       -- JSON
  enabled     BOOLEAN DEFAULT TRUE,
  is_builtin  BOOLEAN DEFAULT FALSE,
  sort_order  INTEGER DEFAULT 0
);

-- Préférences utilisateur
CREATE TABLE preferences (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL               -- JSON
);
```

---

## 10. Roadmap

### Étape 1 — In-memory + Redux + UI (Semaine 1–4) ◄── ON EST ICI

Objectif : boucle complète **fetch → triage → action** sans DB, sans Tauri, sans API réelle.

- [ ] Monorepo : `@app/core`, `@app/infrastructure`, `@app/store`, `@app/ui`, `@app/web`
- [ ] Domain entities + ports + use cases avec tests Vitest
- [ ] Adapters **in-memory** + `FakeGitHubForgeAdapter` (seed data)
- [ ] `createInMemoryContainer()` — wiring complet
- [ ] Redux store : slices, thunks, selectors
- [ ] Composants **100% dumb** + containers
- [ ] Shell Vite (`@app/web`) — lancer dans le browser, hot reload
- [ ] react-intl (en + fr)
- [ ] eslint-plugin-boundaries (components/ ≠ Redux)

**Livrable** : app web fonctionnelle en local, triage de fausses notifications, changement de langue, focus mode.

### Phase 2 — Real adapters + Desktop (Semaine 5–8)

- [ ] `GitHubForgeAdapter` (API réelle) + OAuth
- [ ] `SqliteNotificationRepository` — swap in-memory → SQLite
- [ ] Shell Tauri (`@app/desktop`) — menu bar, tray, OS notifications
- [ ] `createDesktopContainer()` remplace in-memory en prod
- [ ] Build macOS (DMG)

### Phase 3 — Cross-platform + polish (Semaine 9–12)

- [ ] Builds Windows (MSI) + Linux (AppImage)
- [ ] Thèmes clair/sombre
- [ ] Settings panel complet
- [ ] Landing page

### Phase 4 — Power features (Semaine 13–18)

- [ ] Filtres custom + règles if/then
- [ ] Quick reply
- [ ] Snooze
- [ ] Multi-comptes GitHub
- [ ] Auto-update

### Phase 5 — Multi-tool + Web prod (Semaine 19–24)

- [ ] Linear adapter (`IForgeAdapter`)
- [ ] GitLab adapter
- [ ] Feed unifié
- [ ] App web production (IndexedDB, OAuth redirect)
- [ ] v1.0 public release

---

### ~~Phase 0 — Setup~~ (fusionné dans Étape 1)

<details>
<summary>Ancien plan Phase 0–1 (archivé)</summary>

- Initialiser monorepo, SQLite, Tauri dès le départ
- Remplacé par approche in-memory first pour itérer plus vite

</details>

---

## 11. Monétisation

### Stratégie : Open core

| Tier     | Prix         | Inclus                                                                     |
| -------- | ------------ | -------------------------------------------------------------------------- |
| **Free** | $0           | GitHub (1 compte), curation par défaut, toutes les actions, cross-platform |
| **Pro**  | $5/mois      | Multi-comptes, filtres custom, quick reply, snooze, Linear + GitLab, stats |
| **Team** | $8/user/mois | Règles partagées, admin dashboard, priority support                        |

Neat facture $5/mois pour le plan "Believer" (early access + support). Notre free tier doit être **plus généreux** que Neat pour gagner des utilisateurs, avec le Pro comme upgrade naturel pour les power users.

Pas de pub, pas de revente de données — aligné avec le positionnement privacy-first.

---

## 12. Métriques de succès

### Acquisition

- Downloads / semaine (par plateforme)
- Stars GitHub du repo
- Conversion landing page → install

### Engagement

- DAU / WAU ratio (objectif : > 60%)
- Notifications triées par session (objectif : > 10)
- Temps moyen de triage par notification (objectif : < 5s)

### Rétention

- D7 retention (objectif : > 40%)
- D30 retention (objectif : > 25%)

### Revenue (post-lancement Pro)

- Free → Pro conversion (objectif : 5%)
- MRR

---

## 13. Risques & mitigations

| Risque                            | Impact               | Mitigation                                                         |
| --------------------------------- | -------------------- | ------------------------------------------------------------------ |
| GitHub API rate limits            | Fetch lent ou bloqué | Polling intelligent (ETag/If-Modified-Since), backoff, cache local |
| Neat ajoute cross-platform        | Concurrence directe  | Avancer vite sur l'open source + multi-forge                       |
| Electron/Tauri bugs menu bar      | UX dégradée          | Tests E2E par plateforme, beta testers                             |
| OAuth token leak                  | Sécurité             | Keychain natif, jamais de token en clair en DB                     |
| Over-engineering early            | Retard MVP           | Core minimal d'abord — 3 use cases, 2 ports, 1 adapter GitHub      |
| Boundaries violées                | Dette technique      | eslint-plugin-boundaries en CI, dependency-cruiser                 |
| GitHub change l'API notifications | Breaking change      | Adapter pattern isolé, veille API                                  |

---

## 14. Décisions ouvertes

Ces points doivent être tranchés avant le début du dev :

| #   | Décision                | Options                  | Recommandation                                                                   |
| --- | ----------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| 1   | **Runtime desktop**     | Tauri 2 vs Electron      | Tauri 2 (léger, performant)                                                      |
| 2   | **Nom du produit**      | À définir                | Brainstorm nécessaire — éviter "Neat" et les noms existants (Gitify, GitPigeon…) |
| 3   | **GitHub OAuth**        | OAuth App vs GitHub App  | GitHub App (fine-grained permissions, pas de scope `repo` complet)               |
| 4   | **Polling vs Webhooks** | Polling seul vs hybrid   | Polling pour MVP (pas de serveur), webhooks en v1.0 si sync cloud                |
| 5   | **Licence open source** | MIT vs Apache 2.0 vs BSL | MIT (aligné Gitify, maximum d'adoption)                                          |

### Décisions actées

| Décision                | Choix                                                                     |
| ----------------------- | ------------------------------------------------------------------------- |
| **Architecture**        | Clean Architecture — domain / application / infrastructure / presentation |
| **Monorepo**            | pnpm workspaces + Turborepo                                               |
| **Étape 1 persistence** | In-memory repositories — swap transparent vers SQLite en Phase 2          |
| **State front**         | Redux Toolkit — thunks appellent use cases, composants 100% dumb          |
| **UI pattern**          | Container/Presentational — seuls les containers touchent Redux            |
| **UI composants**       | shadcn/ui + Tailwind                                                      |
| **i18n**                | react-intl, en + fr au MVP, détection navigateur + override user          |
| **Étape 1 shell**       | `@app/web` (Vite) — Tauri en Phase 2                                      |
| **DI**                  | `createInMemoryContainer()` → `createDesktopContainer()`                  |

---

## 15. Internationalisation (i18n)

### Décision

**react-intl** dès le MVP, avec détection automatique de la langue et possibilité pour l'utilisateur de la changer manuellement.

### Comportement

```
Premier lancement
       │
       ▼
Préférence locale en DB ? ──oui──► Utiliser la locale sauvegardée
       │
      non
       │
       ▼
navigator.language ──► normaliser (ex. "fr-FR" → "fr")
       │
       ▼
Locale supportée ? ──oui──► Appliquer (ex. "fr")
       │
      non
       │
       ▼
Fallback → "en"
```

L'utilisateur peut à tout moment changer la langue dans **Settings → Language**. Le changement est immédiat (hot swap du `IntlProvider`) et persisté via `SetLocale` use case → `IPreferencesStore` (in-memory en Étape 1).

Option **"System default"** (`locale: "auto"`) : reprend la langue du navigateur/OS à chaque lancement.

### Structure des fichiers

```
packages/ui/src/i18n/
  index.ts              # resolveLocale(), IntlProvider setup
  locales/
    en.json               # messages anglais (langue de référence)
    fr.json               # messages français
  hooks/
    useLocale.ts          # { locale, setLocale, supportedLocales }
```

> L'i18n vit dans `@app/ui` (présentation). Le use case `SetLocale` persiste via le port `IPreferencesStore` — la UI ne touche pas SQLite directement.

### Exemple de messages

```json
// en.json
{
  "app.name": "Triage",
  "notifications.empty": "No notifications",
  "notifications.empty.description": "You're all caught up!",
  "notifications.count": "{count, plural, =0 {No notifications} one {# notification} other {# notifications}}",
  "actions.markRead": "Mark as read",
  "actions.open": "Open",
  "settings.language": "Language",
  "settings.language.auto": "System default",
  "settings.language.en": "English",
  "settings.language.fr": "Français"
}
```

### Implémentation clé

```typescript
// src/i18n/index.ts
const SUPPORTED_LOCALES = ["en", "fr"] as const;
const DEFAULT_LOCALE = "en";

export function resolveLocale(stored?: string | null): string {
  if (stored && stored !== "auto" && SUPPORTED_LOCALES.includes(stored as any)) {
    return stored;
  }
  const browserLang = navigator.language.split("-")[0];
  return SUPPORTED_LOCALES.includes(browserLang as any) ? browserLang : DEFAULT_LOCALE;
}
```

```typescript
// Préférence persistée
// key: "locale"  →  value: "auto" | "en" | "fr"
```

### Règles de dev

1. **Aucune string hardcodée** dans les composants UI — tout passe par `<FormattedMessage>` ou `useIntl().formatMessage()`
2. **`en.json` est la source de vérité** — toute nouvelle clé est ajoutée en anglais d'abord
3. **Clés namespaced** : `section.element.action` (ex. `settings.language.label`)
4. **Pluriels & interpolation** via ICU syntax (support natif react-intl)
5. **Dates & nombres** via `FormattedDate`, `FormattedRelativeTime`, `FormattedNumber`
6. **Nouvelles langues** = ajouter un fichier JSON + entrée dans `SUPPORTED_LOCALES` — pas de refactor

### Langues prévues

| Phase | Langues                                   |
| ----- | ----------------------------------------- |
| MVP   | English (en), Français (fr)               |
| v0.2  | Español (es), Deutsch (de)                |
| v1.0  | Community-driven via PRs (ja, pt-BR, zh…) |

### Contenu non traduit

Les données venant des APIs externes (titres de PR, noms de repos, commentaires GitHub) restent dans leur langue d'origine — seule l'UI chrome est traduite.

---

## 16. Étape 1 — In-memory + Redux

### Objectif

Itérer **vite** sur le produit (UX, triage, i18n) sans friction infra : pas de SQLite, pas de Tauri, pas d'OAuth GitHub. Tout est simulé en mémoire, l'UI tourne dans le browser via Vite.

### Principes

1. **Ports d'abord** — les use cases dépendent d'interfaces, pas d'implémentations
2. **In-memory par défaut** — `createInMemoryContainer()` wire tous les adapters mémoire
3. **Redux isole le front** — seul `@app/store` connaît les use cases côté UI
4. **Composants dumb à 100%** — `components/` = props + JSX, zéro side effect
5. **Swap sans refactor** — remplacer un adapter in-memory par SQLite/API ne change ni le core ni la UI

### Adapters in-memory (Étape 1)

| Port                      | Implémentation                   | Comportement                                            |
| ------------------------- | -------------------------------- | ------------------------------------------------------- |
| `INotificationRepository` | `InMemoryNotificationRepository` | `Map<string, Notification>` en RAM                      |
| `IPreferencesStore`       | `InMemoryPreferencesStore`       | `Map<string, unknown>` — perdu au refresh (OK pour dev) |
| `ITokenStore`             | `InMemoryTokenStore`             | Fake token statique                                     |
| `IForgeAdapter`           | `FakeGitHubForgeAdapter`         | Seed data : 10–20 fausses notifs variées                |
| `IOsNotificationService`  | `InMemoryOsNotificationService`  | Log console (pas de vraie bannière OS)                  |
| `IClock`                  | `SystemClock`                    | Date réelle                                             |

### Seed data (FakeGitHubForgeAdapter)

Jeux de données prévus pour tester le triage :

- 2 review requests (priorité haute)
- 1 security alert Dependabot (priorité max)
- 3 @mentions
- 2 assignments
- 5 commentaires sur PR (priorité moyenne)
- 3 CI failures (priorité basse)
- 4 star/fork (muted)

### Où vit la logique métier ?

```
┌─────────────────────────────────────────────────────────┐
│  LOGIQUE MÉTIER (ne change jamais entre étapes)         │
│  @app/core — entities, PriorityScorer, use cases        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ORCHESTRATION FRONT (Redux)                            │
│  @app/store — thunks dispatch use cases, slices = view  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  RENDU (zero logic)                                     │
│  @app/ui/components — dumb, props only                  │
│  @app/ui/containers — Redux → props mapping             │
└─────────────────────────────────────────────────────────┘
```

> Redux **n'est pas** la logique métier — c'est la couche de présentation qui orchestre les use cases et tient l'état view. La vraie logique reste dans `@app/core`.

### Checklist ESLint (dumb components)

```typescript
// ❌ INTERDIT dans components/
import { useDispatch, useSelector } from "react-redux";
import { markAsRead } from "@app/store";
import { SyncNotifications } from "@app/core";

// ✅ AUTORISÉ dans components/
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "react-intl";
import type { NotificationItemProps } from "./NotificationItem.types";
```

### Migration Étape 1 → Phase 2

| Composant            | Étape 1                          | Phase 2                        | Changement              |
| -------------------- | -------------------------------- | ------------------------------ | ----------------------- |
| Repository           | `InMemoryNotificationRepository` | `SqliteNotificationRepository` | 1 fichier adapter       |
| Forge                | `FakeGitHubForgeAdapter`         | `GitHubForgeAdapter`           | 1 fichier adapter       |
| Token                | `InMemoryTokenStore`             | `TauriTokenStore`              | 1 fichier adapter       |
| Container DI         | `createInMemoryContainer()`      | `createDesktopContainer()`     | 1 ligne dans `main.tsx` |
| Shell                | `@app/web` (Vite)                | `@app/desktop` (Tauri)         | nouveau package         |
| `@app/core`          | —                                | —                              | **Aucun changement**    |
| `@app/store`         | —                                | —                              | **Aucun changement**    |
| `@app/ui/components` | —                                | —                              | **Aucun changement**    |

### Commande de dev (cible)

```bash
pnpm install
pnpm --filter @app/web dev     # browser, hot reload, in-memory
pnpm --filter @app/core test   # use cases testés sans UI
```

---

## Annexes

### A. Ressources API

- [GitHub Notifications API](https://docs.github.com/en/rest/activity/notifications)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [Linear API](https://developers.linear.app/docs/graphql/working-with-the-graphql-api)
- [GitLab Notifications API](https://docs.gitlab.com/ee/api/notification_settings.html)

### B. Références UX

- [Neat — Best tools for GitHub notifications](https://neat.run/blog/best-tools-for-github-notifications)
- [Gitify — CONTRIBUTING.md (scope & philosophy)](https://github.com/gitify-app/gitify/blob/main/CONTRIBUTING.md)
- [GitHub Primer Design System](https://primer.style/)

### C. Raccourcis clavier (spec MVP)

| Raccourci              | Action                     |
| ---------------------- | -------------------------- |
| `⌘⇧G` / `Ctrl+Shift+G` | Toggle panel               |
| `↑` / `↓`              | Naviguer dans la liste     |
| `Enter`                | Ouvrir dans le navigateur  |
| `R`                    | Mark as read               |
| `U`                    | Mark as unread             |
| `P`                    | Pin / unpin                |
| `D`                    | Dismiss (archive)          |
| `C`                    | Copy link                  |
| `F`                    | Toggle focus mode          |
| `Esc`                  | Fermer le panel            |
| `1-9`                  | Sélection rapide par index |

---

_Document créé le 15 juillet 2026 — v0.4_  
_Prochaine étape : scaffolder le monorepo (Étape 1 — in-memory + Redux + dumb components)._
