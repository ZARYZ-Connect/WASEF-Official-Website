# WASEF Manufacturing — Premium Industrial Website

**Stack:** React.js (Vite) + Django REST Framework  
**Design:** Industrial Yellow `#FFC72C` × Charcoal `#0D0D0D` × Gunmetal

---

## Quick Start

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5174
```

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
# → http://localhost:8000
# Admin → http://localhost:8000/admin  (admin / Admin@1234)
```

---

## Project Structure

```
WASEF official website/
├── frontend/                    # React + Vite app
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── components/
│       │   ├── Navbar/          # Glassmorphism navbar + mega-menu
│       │   └── Footer/          # Dark footer with certifications
│       ├── pages/
│       │   ├── Home/            # Hero, stats, services, certifications
│       │   ├── About/           # Timeline, leadership, facilities
│       │   ├── Services/        # Service list + detail pages (7)
│       │   ├── Projects/        # Case studies grid
│       │   ├── RD/              # R&D capabilities + equipment
│       │   ├── Careers/         # Job listings with filter
│       │   ├── Downloads/       # Certificates + document library
│       │   ├── Contact/         # Quote form with Zod validation
│       │   └── NotFound/        # 404 page
│       ├── data/
│       │   └── staticData.js    # Static fallback content
│       └── services/
│           └── api.js           # Axios API client
│
├── backend/                     # Django + DRF
│   ├── config/                  # Project settings + URLs
│   ├── api/
│   │   ├── models.py            # 8 models: Service, Project, Cert...
│   │   ├── serializers.py       # DRF serializers
│   │   ├── views.py             # ViewSets + contact endpoint
│   │   ├── urls.py              # API routing
│   │   └── admin.py             # Django admin config
│   └── manage.py
│
└── docker-compose.yml           # Production deployment
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/services/` | GET | All services |
| `/api/services/{slug}/` | GET | Single service |
| `/api/services/featured/` | GET | Featured services |
| `/api/projects/` | GET | All case studies |
| `/api/certifications/` | GET | Active certifications |
| `/api/facilities/` | GET | All facility locations |
| `/api/careers/` | GET | Active job listings |
| `/api/documents/` | GET | Public documents |
| `/api/clients/` | GET | Client logos |
| `/api/stats/` | GET | Site-wide statistics |
| `/api/contact/` | POST | Submit inquiry |

---

## Design System

### Colors
```css
--yellow-500: #FFC72C;     /* Primary CTA / accent */
--charcoal-900: #0D0D0D;   /* Hero backgrounds */
--charcoal-700: #1A1A1A;   /* Card backgrounds */
--gray-100: #F7F7F5;       /* Light sections */
```

### Key Components
- **Navbar**: Glassmorphism + mega-menu dropdown + mobile drawer
- **Hero**: Animated slide carousel + rotating laser rings + floating badges
- **Stats**: Intersection-observer animated counters
- **Services**: 7-capability grid with hover laser glow
- **Certifications**: Hover-elevation badge cards
- **Marquee**: CSS infinite scroll client logo strip
- **Contact Form**: react-hook-form + Zod schema validation

---

## Adding Content (Django Admin)

1. Go to `http://localhost:8000/admin`
2. Login: `admin` / `Admin@1234`
3. Add services, projects, certifications, facilities, careers, and documents
4. Content will automatically appear in the frontend via the API

---

## Production Deployment

```bash
# Build frontend
cd frontend && npm run build

# Set env vars
cp .env.example .env  # fill in secrets

# Docker
docker-compose up -d
```

---

## Certifications Displayed
- **AS9100D** — Aerospace Quality Management (SAI Global)
- **NADCAP** — Special Process (laser welding) — PRI
- **ISO 9001:2015** — Quality Management (TÜV Rheinland)
- **ISO 14001:2015** — Environmental Management (Bureau Veritas)
