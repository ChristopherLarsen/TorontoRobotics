import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const articles = [
  {
    slug: "boston-dynamics-electric-atlas-2026",
    title: "Boston Dynamics Launches Electric Atlas: The Next Generation of Industrial Robotics",
    summary:
      "Boston Dynamics unveiled its all-new Electric Atlas at CES 2026, a high-performance enterprise-grade humanoid robot designed for industrial tasks. The company announced a strategic partnership with Google DeepMind to integrate Gemini Robotics AI.",
    body: `Boston Dynamics made waves at CES 2026 with the unveiling of its revolutionary Electric Atlas, marking a significant leap forward in enterprise robotics.

## A New Era for Humanoid Robots

The Electric Atlas represents a complete reimagining of industrial automation. Unlike its predecessor, the new Electric Atlas is designed as a high-performance, enterprise-grade humanoid robot capable of carrying out a wide range of industrial tasks—from material handling to order fulfillment.

## Strategic Partnership with Google DeepMind

In a major strategic move, Boston Dynamics announced a partnership with Google DeepMind to integrate advanced Gemini Robotics AI into the Electric Atlas. This collaboration combines Boston Dynamics' world-class robotics hardware with DeepMind's cutting-edge AI reasoning capabilities, creating a system that can understand complex tasks and adapt to real-world environments.

## Real-World Deployment

The company has already secured initial deployment sites, with units planned to begin operations at Hyundai's Metaplant in Georgia in 2026. These early deployments will serve as proving grounds for the technology in actual manufacturing environments.

## What This Means for Industry

The Electric Atlas represents a turning point in robotics. With advanced AI integration and proven manufacturing partnerships, humanoid robots are transitioning from research projects to production-ready tools that companies are willing to deploy in their facilities. This signals investor confidence and validates years of development investment.

The combination of Boston Dynamics' hardware expertise and DeepMind's AI capabilities creates a formidable technology stack that could reshape how factories and logistics operations function globally.`,
    category: "news",
    publishedAt: new Date("2026-03-08"),
    sourceUrl: "https://www.therobotreport.com/boston-dynamics-electric-atlas-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop",
  },
  {
    slug: "china-humanoid-robots-spring-festival",
    title: "China's Humanoid Robots Showcase Advanced Capabilities at Spring Festival Gala",
    summary:
      "Chinese humanoid robots stunned viewers by performing kung fu and martial arts movements at the Spring Festival Gala, demonstrating remarkable progress from the previous year. This marks a significant turning point in public perception of Chinese robotics.",
    body: `The 2026 Spring Festival Gala featured an unexpected technological highlight: Chinese humanoid robots performing intricate kung fu movements and martial arts routines. The demonstration shocked audiences and industry experts alike, showcasing how quickly Chinese robotics companies have advanced their technology.

## From Viral Stumbles to Perfect Flips

Just one year ago, videos of Chinese humanoid robots struggling with basic movements went viral on social media. The contrast with this year's Spring Festival performance couldn't be more dramatic. The robots executed complex martial arts sequences with precision and grace, performing kicks, flips, and coordinated movements that seemed impossible months earlier.

## A Statement of Dominance

The performance wasn't just entertainment—it was a statement. China's robotics industry is accelerating at a pace that's catching global competitors off guard. Companies like Unitree have shipped roughly 36 times more humanoid robot units than U.S. rivals Figure and Tesla, demonstrating the gap in production scale.

## Technical Improvements

The improvements visible in the Spring Festival performance reflect advances across multiple domains:
- Enhanced motor control and balance systems
- Improved AI-driven movement planning
- Better integration of sensors and feedback systems
- More responsive actuators and joint mechanisms

## What Comes Next

With this public demonstration of capability, Chinese robotics companies are poised to expand both domestically and internationally. The confidence shown by these companies suggests 2026 will see accelerated commercialization efforts in manufacturing, logistics, and potentially consumer markets.

The message is clear: China's humanoid robot industry has moved from promising experiments to demonstrated capability, and the global robotics landscape is shifting rapidly.`,
    category: "news",
    publishedAt: new Date("2026-03-07"),
    sourceUrl: "https://www.cnbc.com/2026/02/20/china-humanoid-robots-spring-festival-gala",
    imageUrl:
      "https://images.unsplash.com/photo-1516962140952-381b220283df?w=1200&h=630&fit=crop",
  },
  {
    slug: "nvidia-physical-ai-models-launch",
    title: "NVIDIA Releases Physical AI Models as Global Partners Unveil Next-Generation Robots",
    summary:
      "NVIDIA released new Cosmos and GR00T open models alongside multiple technology partners including Boston Dynamics, Caterpillar, and LG Electronics unveiling robots built on NVIDIA's physical AI technology.",
    body: `NVIDIA made a bold announcement at its developer conference, releasing new foundational models for physical AI and revealing partnerships with some of the world's leading robotics companies.

## New Foundational Models for Robotics

The release of NVIDIA Cosmos and GR00T represents significant open-sourcing efforts aimed at democratizing physical AI. These models provide the foundation for robots to understand the physical world and reason about actions needed to accomplish tasks.

## What Sets These Models Apart

Traditional AI models understand language and images in digital space. Physical AI models go further—they understand how objects interact, how physics constraints limit possibilities, and how to plan sequences of actions in the real world. NVIDIA's new models bring this capability to a broader set of developers and companies.

## Major Partnership Announcements

NVIDIA's partnerships extend across multiple industries:
- **Boston Dynamics** integrated the models into its Electric Atlas platform
- **Caterpillar** announced new autonomous equipment powered by NVIDIA technology
- **Franka Robotics** developed collaborative industrial arms using the models
- **Humanoid** created specialized robotics platforms on the foundation
- **LG Electronics** unveiled consumer-focused robotic systems
- **NEURA Robotics** announced advanced manufacturing solutions

## Democratizing Robot Development

By open-sourcing these foundational models, NVIDIA is following the strategy that made CUDA dominant in AI development. The goal is to make it easier and faster for companies to develop physical AI applications, accelerating innovation across the industry.

## Industry Impact

This coordinated release signals that physical AI has reached an inflection point. When market-leading companies simultaneously announce new products built on a common foundation, it suggests the technology has matured to the point where it's production-ready. Expect accelerated robot deployments across manufacturing, logistics, and services over the next year.`,
    category: "news",
    publishedAt: new Date("2026-03-05"),
    sourceUrl:
      "https://nvidianews.nvidia.com/news/nvidia-releases-new-physical-ai-models-as-global-partners-unveil-next-generation-robots",
    imageUrl:
      "https://images.unsplash.com/photo-1677442d019cecf4d757417261cf1ecdb58f81dde?w=1200&h=630&fit=crop",
  },
  {
    slug: "agility-robotics-toyota-expansion",
    title: "Agility Robotics Expands Commercial Partnership with Toyota Manufacturing Canada",
    summary:
      "Agility Robotics expanded its relationship with Toyota from a pilot program to a commercial deployment of 7+ Digit humanoid robots at Toyota Manufacturing Canada's Woodstock plant for logistics and manufacturing operations.",
    body: `Agility Robotics announced a major expansion of its commercial partnership with Toyota, moving from pilot testing to full-scale deployment of its Digit humanoid robots in a Canadian manufacturing facility.

## From Pilot to Production

The partnership began with careful evaluation of Digit's capabilities in manufacturing environments. Toyota, known for its rigorous standards and continuous improvement philosophy, was an ideal testing ground. The successful pilot results convinced Toyota to commit to deploying 7 or more units of the latest Digit robots at its Woodstock, Ontario facility.

## Why Toyota Chose Digit

Toyota's decision to deploy humanoid robots reflects confidence in several key advantages:
- **Adaptive to existing infrastructure**: Digit works alongside human workers without requiring facility redesign
- **Handles varied tasks**: The humanoid form factor allows the robot to perform diverse logistics and assembly tasks
- **Human-safe interaction**: Designed to work safely in shared spaces with human employees
- **Continuous improvement**: Regular updates and improvements based on real-world deployment data

## What Digit Will Do

At the Woodstock plant, Digit robots will handle:
- Material handling and logistics operations
- Parts transportation between workstations
- Order fulfillment and packaging
- Other warehouse and assembly support tasks

## Industry Significance

This isn't just a pilot anymore—it's a commercial deployment by one of the world's most demanding automotive manufacturers. Toyota's willingness to deploy multiple units signals they expect positive ROI and improved operations. When a company with Toyota's standards commits to this level of deployment, it validates the technology for the broader manufacturing industry.

## What's Next

Successful deployment at Woodstock could lead to expansion to other Toyota facilities worldwide. If the Canadian deployment meets Toyota's standards, expect rapid scaling across their global operations.`,
    category: "news",
    publishedAt: new Date("2026-03-04"),
    sourceUrl: "https://www.rebootrobotics.org/agility-robotics-toyota",
    imageUrl:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=630&fit=crop",
  },
  {
    slug: "gather-ai-40-million-funding",
    title: "Gather AI Secures $40 Million to Scale Physical AI Platform for Logistics",
    summary:
      "Gather AI announced $40 million in funding to accelerate development and deployment of its physical AI platform designed specifically for logistics and warehouse automation.",
    body: `Gather AI, a startup focused on applying physical AI to logistics challenges, announced a significant funding round that signals strong investor confidence in the application of advanced robotics to supply chain operations.

## Large Funding Round for Logistics Robotics

The $40 million funding round demonstrates that investors see logistics as the highest-value near-term application for physical AI. With supply chain disruptions costing companies billions annually, automation solutions that can scale quickly across existing facilities represent compelling business opportunities.

## The Problem Gather AI Is Solving

Logistics and warehouse operations are uniquely challenging for robotics:
- High variability in tasks and packages
- Complex spatial reasoning required
- Need for reliable human-robot collaboration
- Requirement to work within existing facility designs

Traditional automation solutions require massive infrastructure changes. Gather AI's approach aims to deploy AI-driven robotic systems that adapt to existing environments and tasks.

## Funding Will Accelerate Development

With $40 million in capital, Gather AI plans to:
- Expand its engineering team
- Scale pilot deployments to major logistics partners
- Improve the flexibility and reliability of its systems
- Build out distribution and support networks

## Market Opportunity

The global logistics market is worth hundreds of billions annually. Even modest improvements in warehouse efficiency could save companies enormous sums. The e-commerce boom has created urgent demand for warehouse automation that can handle diverse products and order types.

## Competitive Landscape

Gather AI isn't alone—multiple companies are pursuing logistics automation with AI. However, the company's focused approach and early funding success suggest they've achieved meaningful proof of concept that convinced investors to back them.

## Timeline to Impact

With strong funding and market demand, expect to see Gather AI deployments in major warehouses and logistics hubs within 12-24 months. Success here could establish the company as a leader in physical AI for industrial applications.`,
    category: "news",
    publishedAt: new Date("2026-03-03"),
    sourceUrl: "https://www.robotics247.com/gather-ai-40-million",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=630&fit=crop",
  },
  {
    slug: "serve-robotics-2000-robots-deployed",
    title: "Serve Robotics Achieves 2,000+ Autonomous Delivery Robot Milestone",
    summary:
      "Serve Robotics, backed by Nvidia and Uber, announced it has deployed over 2,000 autonomous sidewalk delivery robots, creating the largest operational fleet of sidewalk delivery robots in the United States.",
    body: `Serve Robotics announced a major operational milestone: the deployment of more than 2,000 autonomous delivery robots across the United States, establishing the largest sidewalk delivery fleet in the country.

## From Concept to Scale

Serve Robotics moved remarkably quickly from concept to operational scale. The company's autonomous sidewalk delivery robots navigate urban environments, cross intersections, and deliver packages to customers' doorsteps with minimal human intervention.

## Partnership Advantages

Backing from Nvidia and Uber provides significant advantages:
- **Nvidia**: Access to cutting-edge hardware and AI technology
- **Uber**: Partnership for integration into Uber's delivery network and access to customer base
- **Capital**: Resources to expand operations and improve technology

These partnerships enabled Serve to achieve meaningful scale before competitors, establishing market presence and operational data advantages.

## Technical Achievement

Operating 2,000+ robots in diverse urban environments represents a significant technical achievement:
- Real-time navigation in unpredictable environments
- Safe interaction with pedestrians
- Weather-resistant operation
- Reliable autonomous decision-making
- Minimal remote intervention required

## Economic Impact

The deployment of this many autonomous delivery robots has real economic implications:
- Reduced delivery costs for Uber and customers
- Improved delivery speed in some markets
- Job displacement in last-mile delivery (important for policy discussions)
- New jobs in robot operations and maintenance

## Market Validation

This milestone validates the autonomous delivery market. When a company achieves 2,000+ units in operation, it's no longer a pilot or demonstration—it's a functioning business at scale. Other companies will notice this success and attempt to replicate it.

## What Comes Next

With proven operational success, expect expansion of autonomous delivery fleets. Other companies will likely accelerate their development timelines. Urban regulations around autonomous robots will likely evolve to accommodate this technology.

The autonomous delivery industry has shifted from "will this work?" to "how do we scale faster?"`,
    category: "news",
    publishedAt: new Date("2026-03-02"),
    sourceUrl: "https://techstartups.com/serve-robotics-2000-delivery-robots",
    imageUrl:
      "https://images.unsplash.com/photo-1606273527489-eae4076c9936?w=1200&h=630&fit=crop",
  },
  {
    slug: "tesla-optimus-gen-2-advances",
    title: "Tesla Optimus Gen 2: The Next Evolution of General-Purpose Robotics",
    summary:
      "Tesla continues development of its Optimus humanoid robot with significant improvements in Gen 2, designed to handle both industrial and domestic tasks while learning from real-world deployment data.",
    body: `Tesla's continued development of its Optimus humanoid robot represents one of the most ambitious robotics projects underway. The Gen 2 iteration shows meaningful progress toward a truly general-purpose robot.

## Design Philosophy

Tesla's approach to robotics differs from many competitors. Rather than building robots to solve specific problems, Tesla aims for a general-purpose humanoid that can adapt to diverse tasks. This philosophy mirrors Tesla's success in electric vehicles—build a platform that can be continuously improved.

## Gen 2 Improvements

The second generation of Optimus includes enhancements across multiple dimensions:
- More natural human-like movements
- Improved dexterity in hand and finger manipulation
- Better sensory integration and real-world understanding
- Faster processing for real-time decision-making
- Extended operational battery life

## Dual-Use Design

Tesla designed Optimus to work in both industrial and domestic environments:
- **Industrial**: Manufacturing, material handling, assembly tasks
- **Domestic**: Household chores, assistance for elderly or disabled individuals, home automation

This dual focus expands the potential market significantly and allows learning from diverse environments.

## Learning from Real-World Deployment

A key advantage of Tesla's approach is continuous learning. Each deployed robot contributes data that improves the entire fleet. Tesla has the infrastructure and expertise to leverage this data effectively through its AI and machine learning capabilities.

## Competitive Positioning

Tesla enters robotics with several advantages:
- Existing AI and autonomous driving expertise
- Manufacturing excellence and cost discipline
- Direct path to customer deployment through existing channels
- Financial resources to sustain development

However, Tesla's robotics timeline has historically slipped. Managing expectations while making progress remains a challenge.

## Market Impact

When and if Optimus reaches meaningful production scale, it could disrupt multiple industries. The combination of humanoid form factor and general-purpose capability could open applications that more specialized robots cannot address.

## Timeline

Tesla has indicated significant Optimus deployment could begin in coming years. Progress will depend on solving remaining technical challenges and achieving manufacturing scale.`,
    category: "news",
    publishedAt: new Date("2026-03-01"),
    sourceUrl:
      "https://www.interestingengineering.com/tesla-optimus-gen-2-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1495615811223-4d98c6e9c869?w=1200&h=630&fit=crop",
  },
  {
    slug: "xiaomi-humanoid-factory-trials",
    title: "Xiaomi Launches Humanoid Robot Factory Trials with Five-Year Commercialization Timeline",
    summary:
      "Xiaomi announced that its humanoid robots have begun factory trials with ambitious plans for large-scale deployment within five years, joining the race to commercialize humanoid robotics.",
    body: `Chinese electronics giant Xiaomi announced a major milestone in its robotics development program: its humanoid robots have begun real-world factory trials with a clear path to large-scale commercialization.

## From Development to Deployment

Xiaomi's entry into humanoid robotics represents significant commitment from one of the world's largest consumer electronics companies. The move from research and development to actual factory trials indicates the company has achieved sufficient technical maturity to attempt real-world validation.

## Five-Year Commercialization Plan

Xiaomi's timeline is ambitious but grounded in realistic milestones:
- **Years 1-2**: Factory trials and optimization based on real-world feedback
- **Years 2-3**: Scale pilot deployments across multiple manufacturing partners
- **Years 3-5**: Achieve meaningful commercial production and deployment

This timeline suggests Xiaomi expects to have commercial humanoid robots available within five years—not a vague promise but a specific strategic commitment.

## Why Xiaomi Can Succeed

Several factors position Xiaomi well for success in humanoid robotics:
- **Manufacturing expertise**: Deep experience building at scale efficiently
- **Supply chain**: Established relationships with component suppliers
- **Capital**: Financial resources to sustain long development cycles
- **Ecosystem**: Connections to potential deployment partners
- **AI capabilities**: Existing expertise in machine learning and AI

## Factory Trial Details

While Xiaomi hasn't disclosed which factories are participating in trials, such programs typically involve:
- Testing in actual manufacturing environments
- Gathering data on reliability and performance
- Identifying gaps between lab performance and field requirements
- Training operators and support staff
- Iterating on hardware and software based on real-world experience

## Market Competition

Xiaomi's entry adds another major competitor to the humanoid robotics space. When large, well-capitalized companies commit to commercialization timelines, it signals the technology has matured beyond speculative investment.

## Global Supply Chain Impact

If Xiaomi succeeds in deploying humanoid robots at scale, it could reshape global manufacturing. Lower-cost robots from Chinese manufacturers could accelerate adoption worldwide, fundamentally changing how factories operate.

## Investment Signal

Xiaomi's public commitment to commercialization within five years likely signals to investors that the company expects positive returns on its robotics investment. When companies of Xiaomi's caliber make such public commitments, they typically back them with substantial resources.`,
    category: "news",
    publishedAt: new Date("2026-02-28"),
    sourceUrl: "https://technode.com/xiaomi-humanoid-robots-factory-trials",
    imageUrl:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=630&fit=crop",
  },
  {
    slug: "1x-neo-consumer-deliveries",
    title: "1X's NEO Humanoid Robot Moves to Consumer Delivery in 2026",
    summary:
      "1X announced that its NEO humanoid robot will begin deliveries to early customers in 2026, marking a major milestone for consumer-facing humanoid robotics.",
    body: `Norwegian robotics company 1X announced that its NEO humanoid robot is ready for consumer deployment, with first customer deliveries planned for 2026. This represents a significant milestone in consumer robotics.

## From Research to Residential

1X has methodically developed NEO through years of research and refinement. The transition to actual customer delivery marks confidence that the technology meets reliability standards for residential use—one of the most demanding environments for robotics.

## What NEO Does

The NEO robot is designed for domestic assistance:
- Household task automation
- Assistance for elderly or disabled individuals
- Home security and monitoring
- Routine household chores
- Interactive companionship

Unlike industrial robots deployed in controlled factory environments, NEO must operate safely in unpredictable home settings where it interacts with family members, pets, and variable surroundings.

## Technical Challenges Overcome

Achieving residential-ready robotics requires solving problems that industrial robotics don't face:
- Safe interaction with untrained users
- Operation in diverse, uncontrolled environments
- Reliability and support infrastructure for consumer customers
- Cost structure that makes residential deployment viable
- User interface design for non-technical users

## 2026 Deliveries

The announcement of 2026 deliveries suggests 1X has:
- Completed functional prototyping
- Secured supply chains for components
- Established support and warranty infrastructure
- Built manufacturing capacity
- Achieved reliability standards for commercial operation

## Market Potential

The consumer humanoid robot market could be enormous. Aging populations in developed countries face worker shortages in care and assistance. Robots like NEO could address this gap while improving quality of life for customers.

## Price Point Challenge

The primary barrier to adoption will be cost. Manufacturing humanoid robots at consumer price points remains challenging. 1X's success will likely depend on achieving reasonable pricing while maintaining margins.

## Competition and Timing

1X isn't alone in pursuing consumer robotics—Figure's 1X partnership and other companies are also developing consumer-ready systems. The company that achieves first-mover advantage with reliable, affordable consumer humanoids could establish dominant market position.

## Implications

First customer deliveries of consumer humanoid robots represent a pivotal moment in robotics history. After decades of research, humanoid robots are finally becoming products that consumers can actually purchase and use.`,
    category: "news",
    publishedAt: new Date("2026-02-27"),
    sourceUrl:
      "https://www.interestingengineering.com/1x-neo-consumer-delivery-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1610414716159-e389f8dd9cd2?w=1200&h=630&fit=crop",
  },
  {
    slug: "mobileye-acquires-mentee-robotics",
    title: "Mobileye Acquires Mentee Robotics to Expand into Humanoid Robotics with Advanced Dexterous Hands",
    summary:
      "Intel's Mobileye division announced the acquisition of Mentee Robotics, signaling major expansion beyond autonomous vehicles into humanoid robots with advanced hand capabilities.",
    body: `Mobileye, Intel's autonomous driving company, announced a strategic acquisition of Mentee Robotics, expanding its focus from transportation to general robotics and humanoid systems.

## Strategic Pivot

The acquisition signals that Mobileye and Intel see significant opportunity beyond autonomous vehicles. The autonomous driving market is competitive and maturing; robotics and humanoid systems represent newer, potentially higher-margin opportunities.

## Why Mentee Robotics

Mentee Robotics specializes in highly dexterous humanoid hands—one of the most challenging problems in robotics. The company's expertise in hand design and control makes it valuable to Mobileye's broader robotics vision.

## Advanced Hand Capabilities

Mentee's technology enables humanoid robots to perform fine manipulation tasks:
- Grasping and handling delicate objects
- Performing assembly tasks
- Manipulating tools with precision
- Adapting grip to different objects

This capability gap has limited what humanoid robots can accomplish. With Mentee's technology, humanoid robots can take on more complex, valuable tasks.

## Vertical Integration Strategy

This acquisition reflects a vertical integration strategy—Mobileye is building in-house expertise across multiple robotics domains rather than relying solely on partners. This approach:
- Provides better control over capabilities
- Enables faster innovation cycles
- Improves margins on advanced robotics
- Creates competitive advantages in system integration

## Market Timing

The acquisition comes as humanoid robotics reaches commercial maturity. Companies are consolidating expertise and capabilities to compete in the emerging commercial robotics market. When companies of Mobileye's scale begin acquiring robotics startups, it indicates market readiness.

## What's Next

Expect Mobileye to:
- Integrate Mentee's hand technology into humanoid platforms
- Develop applications requiring advanced dexterity
- Potentially announce partnerships with humanoid manufacturers
- Scale manufacturing of advanced robotic hands

## Competitive Implications

This acquisition strengthens several important companies' positions in robotics:
- **Mobileye** gains deep hands expertise
- **Intel** positions itself as a systems-level robotics player
- **Mentee** gains resources and distribution at scale

Other robotics companies will notice this strategic move and likely pursue similar acquisition and partnership strategies.

## Financial Impact

Acquisition details weren't disclosed, but the deal represents significant investment in robotics capabilities. This capital commitment signals Intel's serious intentions in the robotics market.`,
    category: "news",
    publishedAt: new Date("2026-02-26"),
    sourceUrl:
      "https://www.mobileye.com/mobileye-acquires-mentee-robotics-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a775?w=1200&h=630&fit=crop",
  },
];

async function seedNewsArticles() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql, { schema });

    console.log("Seeding news articles...");

    for (const article of articles) {
      const result = await db
        .insert(schema.articles)
        .values({
          slug: article.slug,
          title: article.title,
          summary: article.summary,
          body: article.body,
          category: article.category,
          publishedAt: article.publishedAt,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
        })
        .returning();

      console.log(`✓ Created: ${article.title}`);
    }

    console.log(`\n✓ Successfully seeded ${articles.length} news articles`);
  } catch (error) {
    console.error("Error seeding articles:", error);
    process.exit(1);
  }
}

seedNewsArticles();
