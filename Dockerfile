# =============================================================
# Stage 1: Build Next.js Static Export
# =============================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy package manifests and install node dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build static export to /app/out
COPY . .
RUN npm run build

# =============================================================
# Stage 2: Python FastAPI Backend + Unified Static Serving
# =============================================================
FROM python:3.11-slim
WORKDIR /app

# Install minimal system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements (with CPU-optimized PyTorch and Sentence-Transformers)
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend application source code
COPY backend ./backend

# Copy built frontend assets from Stage 1 into /app/out
COPY --from=frontend-builder /app/out ./out

# Expose default Render port
ENV PORT=10000
EXPOSE 10000

# Start unified Uvicorn server hosting both API and Frontend
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-10000}"]
