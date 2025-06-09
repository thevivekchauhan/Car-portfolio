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
                name: 'BuildMyResume',
                description: 'You can build a comprehensive, professional resume that effectively showcases your qualifications and makes a strong impression on potential employers.',
                imageSources: [
                    './models/projects/vivekresumebuilder/slideA.jpg',
                    './models/projects/vivekresumebuilder/slideB.jpg',
                    './models/projects/vivekresumebuilder/slideC.jpg'
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
                name: 'Vivek Space',
                description: 'A showcase of rooms and spaces I’ve built, blending design, functionality, and craftsmanship. Each project reflects my commitment to quality and creating environments that inspire.',
                imageSources: [
                    './models/projects/vivekspace/slideA.jpg',
                    './models/projects/vivekspace/slideB.jpg',
                    './models/projects/vivekspace/slideC.jpg'
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
                name: 'MAC OS',
                imageSources: [
                    './models/projects/operating/slideA.jpg',
                    './models/projects/lockMAC/slideB.jpg',
                    './models/projects/finderMAC/slideC.jpg'
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
                name: "Vivek's Room",
                imageSources: [
                    './models/projects/Vivek\'s_Room/slideA.jpg',
                    './models/projects/Vivek\'s_Room/slideB.jpg',
                    './models/projects/Vivek\'s_Room/slideC.jpg'
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
                name: 'Vi Way',
                imageSources: [
                    './models/projects/viway/slideA.jpg',
                    './models/projects/viway/slideB.jpg',
                    './models/projects/viway/slideC.jpg'
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
                imageSources: [
                    './models/projects/vivekcodex/slideA.jpg',
                    './models/projects/vivekcodex/slideB.jpg',
                    './models/projects/vivekcodex/slideC.jpg'
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
                imageSources: [
                    './models/projects/vivekportfoliox/slideA.jpg',
                    './models/projects/vivekportfoliox/slideB.jpg',
                    './models/projects/vivekportfoliox/slideC.jpg'
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
                imageSources: [
                    './models/projects/GovHub/slideA.jpg',
                    './models/projects/GovHub/slideB.jpg',
                    './models/projects/GovHub/slideC.jpg'
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
                imageSources: [
                    './models/projects/jewellery/slideA.jpg',
                    './models/projects/jewellery/slideB.jpg',
                    './models/projects/jewellery/slideC.jpg'
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
                imageSources: [
                    './models/projects/vivekpassx/slideA.jpg',
                    './models/projects/vivekpassx/slideB.jpg',
                    './models/projects/vivekpassx/slideC.jpg'
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
                imageSources: [
                    './models/projects/podcast/slideA.jpg',
                    './models/projects/podcast/slideB.jpg',
                    './models/projects/podcast/slideC.jpg'
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
                imageSources: [
                    './models/projects/Youtube/slideA.jpg',
                    './models/projects/Youtube/slideB.jpg',
                    './models/projects/Youtube/slideC.jpg'
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
