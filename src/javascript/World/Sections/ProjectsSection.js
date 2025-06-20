import * as THREE from 'three'
import Project from './Project'
import gsap from 'gsap'

export default class ProjectsSection
{
    constructor(_options)
    {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.camera = _options.camera
        this.passes = _options.passes
        this.objects = _options.objects
        this.areas = _options.areas
        this.zones = _options.zones
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('projects')
            this.debugFolder.open()
        }

        // Set up
        this.items = []

        this.interDistance = 24
        this.positionRandomess = 5
        this.projectHalfWidth = 9

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setGeometries()
        this.setMeshes()
        this.setList()
        this.setZone()

        // Add all project from the list
        for(const _options of this.list)
        {
            this.add(_options)
        }
    }

    setGeometries()
    {
        this.geometries = {}
        this.geometries.floor = new THREE.PlaneGeometry(16, 8)
    }

    setMeshes()
    {
        this.meshes = {}

        // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
        this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter
        this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter
        this.meshes.boardPlane = this.resources.items.projectsBoardPlane.scene.children[0]
        this.meshes.areaLabel = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, color: 0xffffff, alphaMap: this.resources.items.areaOpenTexture }))
        this.meshes.areaLabel.matrixAutoUpdate = false
    }

    setList()
    {
        this.list = [
             {
                name: "Project Hub",
                description: 'I have developed this website to showcase my projects and skills in a visually appealing and interactive manner. It serves as a digital portfolio, allowing visitors to explore my work and learn more about my expertise.',
                imageSources: [
                    '/models/projects/project-hub.png',
                    '/models/projects/profile.jpg',
                ],
                floorTexture: this.resources.items.projectsVivekRoomFloorTexture,
                link: {
                    href: 'https://github.com/thevivekchauhan',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
             {
                name: "Vivek's Room",
                description: 'This immersive 3D portfolio presents my work through a modern digital room setup where each device—from PCs to mobile phones—runs a personalized Windows clone I developed, illustrating cross-device consistency and UI/UX design capabilities.',
                imageSources: [
                    // '/models/projects/profile.jpg',
                    '/models/projects/Vivek\'s_Room1.png',
                    '/models/projects/Vivek\'s_Room.png',
                ],
                floorTexture: this.resources.items.projectsVivekRoomFloorTexture,
                link: {
                    href: 'https://vivekroom.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
             {
                name: 'Windows OS',
                description: 'The goal of this platform is to serve as a Windows-inspired operating system, offering a centralized experience for users seeking a familiar yet independently developed desktop environment.',
                imageSources: [
                    '/models/projects/lockWindows.png',
                    '/models/projects/homeWindows.png',
                    '/models/projects/windows1.png',
                ],
                floorTexture: this.resources.items.projectsMacOSFloorTexture,
                link: {
                    href: 'https://vivekcore-vivekos-projects.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
              {
                name: 'Vivek Space',
                description: 'A showcase of rooms and spaces I’ve built, blending design, functionality, and craftsmanship. Each project reflects my commitment to quality and creating environments that inspire.',
                imageSources: [
                    '/models/projects/vivekspace.png',
                    '/models/projects/vivekspace1.png',
                    '/models/projects/vivekspace2.png'
                ],
                floorTexture: this.resources.items.projectsVivekSpaceFloorTexture,
                link: {
                    href: 'https://vivekspace.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'BuildMyResume',
                description: 'You can build a comprehensive, professional resume that effectively showcases your qualifications and makes a strong impression on potential employers.',
                imageSources: [
                    // '/models/projects/buildmyresume.png',
                    '/models/projects/vivekresumebuilder1.png',
                    '/models/projects/vivekresumebuilder2.png'
                ],
                floorTexture: this.resources.items.projectsResumeBuilderFloorTexture,
                link: {
                    href: 'https://vivekresumebuilder.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'MAC OS',
                description: 'This project was built to serve as a macOS-inspired operating system, enabling users to experience a refined, Apple-style interface without being confined to proprietary hardware or software limitations.',
                imageSources: [
                    '/models/projects/operating.png',
                    '/models/projects/lockMAC.png',
                    '/models/projects/finderMAC.png'
                ],
                floorTexture: this.resources.items.projectsMacOSFloorTexture,
                link: {
                    href: 'https://vivekmac.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'Vi Way',
                description: 'ViWay is a travel vlog platform that curates and showcases engaging travel content. It offers a seamless user experience for discovering and enjoying travel vlogs from various destinations.',
                imageSources: [
                    '/models/projects/viway.png',
                    '/models/projects/viway1.png',
                    '/models/projects/viway2.png'
                ],
                floorTexture: this.resources.items.projectsViWayFloorTexture,
                link: {
                    href: 'https://viway.vercel.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'vivekcodex',
                description: 'I have developed this website to help you send secret messages securely. Whether it is for your friends, partner (GF, BF), or siblings, you can share coded messages that only those who know this website can understand, so share the link. Keep your conversations private and secure.',
                imageSources: [
                    '/models/projects/vivekcodex.png',
                    // '/models/projects/vivekcodex1.png',
                    '/models/projects/vivekcodex2.png'
                ],
                floorTexture: this.resources.items.projectsVivekCodexFloorTexture,
                link: {
                    href: 'https://vivekcodex.netlify.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'vivekportfoliox',
                description: 'You can create your portfolio using this website in just four simple steps. Follow the process & your beautiful portfolio!',
                imageSources: [
                    '/models/projects/vivekportfoliox.png',
                    '/models/projects/vivekportfoliox1.png',
                    '/models/projects/vivekportfoliox2.png'
                ],
                floorTexture: this.resources.items.projectsVivekPortfolioXFloorTexture,
                link: {
                    href: 'https://vivekportfoliox.netlify.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'Find government job',
                description: 'The purpose of this website is to serve as a centralized platform for individuals seeking employment opportunities within government agencies at various levels.',
                imageSources: [
                    '/models/projects/GovHub.png',
                    '/models/projects/GovHub1.png',
                    '/models/projects/GovHub2.png'
                ],
                floorTexture: this.resources.items.projectsGovHubFloorTexture,
                link: {
                    href: 'https://thevivekchauhan.github.io/GovHub/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'Jewellery Website',
                description: 'I have designed my portfolio to present my expertise, past projects, and experiences in an attractive format, offering potential employers and clients a detailed look at my capabilities and accomplishments.',
                imageSources: [
                    '/models/projects/jewellery.png',
                    '/models/projects/jewellery1.png',
                    '/models/projects/jewellery2.png'
                ],
                floorTexture: this.resources.items.projectsJewelleryFloorTexture,
                link: {
                    href: 'https://thevivekchauhan.github.io/sonu/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'vivekpassx',
                description: 'I have developed this website to help how strong your password is. It is a password strength checker tool that helps you to create a strong password. It is a free online tool that helps you to create a strong password.',
                imageSources: [
                    '/models/projects/vivekpassx.png',
                    '/models/projects/vivekpassx1.png',
                    '/models/projects/vivekpassx2.png'
                ],
                floorTexture: this.resources.items.projectsVivekPassXFloorTexture,
                link: {
                    href: 'https://vivekpassx.netlify.app/',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'Podcast',
                description: 'I focus on delivering insightful content that adds value to others. At the heart of it is a desire to connect with people and build a supportive community.',
                imageSources: [
                    '/models/projects/podcast.png',
                    '/models/projects/podcast1.png',
                    '/models/projects/podcast2.png'
                ],
                floorTexture: this.resources.items.projectsPodcastFloorTexture,
                link: {
                    href: 'https://podcasts.apple.com/us/podcast/vivek-chauhan/id1526873795',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            },
            {
                name: 'YouTube',
                description: 'I’m a travel vlogger capturing the beauty, culture, and stories of places I visit. Follow my journey through cinematic travel videos on this channel.',
                imageSources: [
                    '/models/projects/Youtube001.png',
                    '/models/projects/Youtube002.png',
                    '/models/projects/Youtube003.png',
                ],  
                floorTexture: this.resources.items.projectsYoutubeFloorTexture,
                link: {
                    href: 'https://www.youtube.com/@thevivekchauhan',
                    x: -4.8,
                    y: -3,
                    halfExtents: {
                        x: 3.2,
                        y: 1.5
                    }
                }
            }
        ]
    }

    setZone()
    {
        const totalWidth = this.list.length * (this.interDistance / 2)

        const zone = this.zones.add({
            position: { x: this.x + totalWidth - this.projectHalfWidth - 6, y: this.y },
            halfExtents: { x: totalWidth, y: 12 },
            data: { cameraAngle: 'projects' }
        })

        zone.on('in', (_data) =>
        {
            this.camera.angle.set(_data.cameraAngle)
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: 0, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: 0, duration: 2 })
        })

        zone.on('out', () =>
        {
            this.camera.angle.set('default')
            gsap.to(this.passes.horizontalBlurPass.material.uniforms.uStrength.value, { x: this.passes.horizontalBlurPass.strength, duration: 2 })
            gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, { y: this.passes.verticalBlurPass.strength, duration: 2 })
        })
    }

    add(_options)
    {
        const x = this.x + this.items.length * this.interDistance
        let y = this.y
        if(this.items.length > 0)
        {
            y += (Math.random() - 0.5) * this.positionRandomess
        }

        // Create project
        const project = new Project({
            time: this.time,
            resources: this.resources,
            objects: this.objects,
            areas: this.areas,
            geometries: this.geometries,
            meshes: this.meshes,
            debug: this.debugFolder,
            x: x,
            y: y,
            ..._options
        })

        this.container.add(project.container)

        // Add tiles
        if(this.items.length >= 1)
        {
            const previousProject = this.items[this.items.length - 1]
            const start = new THREE.Vector2(previousProject.x + this.projectHalfWidth, previousProject.y)
            const end = new THREE.Vector2(project.x - this.projectHalfWidth, project.y)
            const delta = end.clone().sub(start)
            this.tiles.add({
                start: start,
                delta: delta
            })
        }

        // Save
        this.items.push(project)
    }
}
