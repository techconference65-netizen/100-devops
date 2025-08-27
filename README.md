# 100 Days of DevOps Labs

A comprehensive interactive learning platform for DevOps skills, inspired by KodeKloud's lab environment. This application provides hands-on practice with Docker containers, real-world scenarios, and progress tracking across 100 carefully curated DevOps challenges.

![100 Days of DevOps Labs](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality
- **100 Interactive Labs**: Comprehensive coverage of DevOps tools and practices
- **Docker Integration**: Real containerized environments for each lab
- **Progress Tracking**: Mark completed labs and track your learning journey
- **Notes & Checklists**: Personal notes and task management for each lab
- **Search & Filter**: Quickly find specific labs or topics

### User Experience
- **KodeKloud-Inspired UI**: Clean, professional interface optimized for learning
- **Dark/Light Themes**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Terminal-Style Output**: Authentic command-line experience

### Technical Features
- **Safe Docker Execution**: Sandboxed container operations per lab
- **Local Storage**: Persistent progress and notes without external dependencies
- **Static Export Ready**: Can be deployed as static files
- **TypeScript**: Full type safety and excellent developer experience

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **Git** (for cloning the repository)
- **Ubuntu/Linux** (recommended) or macOS/Windows with WSL2

## 🛠 Installation & Setup

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 100-days-devops-labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate lab folders**
   ```bash
   npm run generate-labs
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Option 2: Docker Compose (Recommended)

1. **Clone and start with Docker**
   ```bash
   git clone <repository-url>
   cd 100-days-devops-labs
   docker-compose up --build
   ```

2. **Access the application**
   Open `http://localhost:3000` in your browser

## 📚 Lab Categories

The 100 days are organized into focused learning tracks:

### 🐧 Linux Administration (Days 1-20)
- User management and permissions
- SSH configuration and security
- System services and cron jobs
- Web server setup (Nginx, Apache)
- Database installation and configuration

### 🔄 Version Control (Days 21-34)
- Git fundamentals and workflows
- Branch management and merging
- Conflict resolution
- Advanced Git operations
- Repository management

### 🐳 Containerization (Days 35-47)
- Docker fundamentals
- Container lifecycle management
- Dockerfile creation and optimization
- Docker Compose multi-container apps
- Container networking and volumes

### ☸️ Kubernetes (Days 48-67)
- Pod and deployment management
- Services and networking
- ConfigMaps and Secrets
- Persistent volumes and storage
- Application deployment patterns

### 🔧 CI/CD with Jenkins (Days 68-81)
- Jenkins installation and configuration
- Pipeline creation and management
- Build automation
- Deployment strategies
- Security and access control

### 📋 Configuration Management (Days 82-93)
- Ansible fundamentals
- Playbook development
- Inventory management
- Template and variable usage
- Advanced automation patterns

### 🏗 Infrastructure as Code (Days 94-100)
- Terraform basics
- AWS resource management
- Infrastructure planning
- State management
- Best practices and security

## 🎯 How to Use

### Starting a Lab
1. **Select a Day**: Click on any day in the left sidebar
2. **Read Instructions**: Review the task requirements in the main panel
3. **Start Environment**: Use Docker controls to spin up the lab environment
4. **Complete Tasks**: Follow the step-by-step instructions
5. **Take Notes**: Use the Notes & Checklist tab to track your progress
6. **Mark Complete**: Check off the day when finished

### Docker Controls
- **Start**: Launches the lab environment (`docker-compose up -d`)
- **Stop**: Shuts down containers (`docker-compose down`)
- **Status**: Shows running containers (`docker-compose ps`)
- **Logs**: Displays container output (`docker-compose logs`)

### Progress Tracking
- Green checkmarks indicate completed labs
- Progress bar shows overall completion percentage
- Notes and checklists are automatically saved locally

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── data/                  # Static data
├── labs/                  # Generated lab folders
│   ├── day-001/          # Individual lab
│   │   ├── README.md     # Lab instructions
│   │   ├── docker-compose.yml
│   │   └── workspace/    # Lab files
├── scripts/              # Utility scripts
├── types/                # TypeScript definitions
└── docker-compose.yml    # Local development setup
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Lab Management
npm run generate-labs   # Generate all 100 lab folders
npm run lint           # Run ESLint

# Docker
docker-compose up      # Start with Docker
docker-compose down    # Stop Docker services
```

### Adding New Labs

1. **Update lab data** in `data/labDays.ts`
2. **Run generation script**: `npm run generate-labs`
3. **Customize lab content** in the generated `labs/day-XXX/` folder
4. **Test the lab** using the Docker controls

## 🛡 Security Considerations

- **Sandboxed Execution**: Docker commands are restricted to lab directories
- **Input Validation**: All API inputs are validated and sanitized
- **No External Dependencies**: Runs completely offline after setup
- **Safe Commands**: Only whitelisted Docker operations are allowed

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all labs work correctly with Docker

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **KodeKloud** for inspiration on lab environment design
- **DevOps Community** for the comprehensive 100-day challenge structure
- **Open Source Contributors** who make projects like this possible

## 📞 Support

If you encounter issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community discussions**

## 🗺 Roadmap

### Upcoming Features
- [ ] Lab completion certificates
- [ ] Advanced progress analytics
- [ ] Community lab sharing
- [ ] Integration with cloud providers
- [ ] Mobile-responsive improvements
- [ ] Offline mode enhancements

### Version History
- **v1.0.0**: Initial release with 100 labs
- **v1.1.0**: Docker Compose integration
- **v1.2.0**: Enhanced UI and progress tracking

---

**Happy Learning!** 🚀

Start your DevOps journey today and master the skills that power modern software delivery.