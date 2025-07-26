import React, { useState, useEffect } from 'react';

interface TooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

function Tooltip({ term, definition, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {isVisible && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="text-sm">
            <div className="font-semibold text-gray-900 mb-1">{term}</div>
            <div className="text-gray-700">{definition}</div>
          </div>
        </div>
      )}
    </>
  );
}

interface TermDefinition {
  term: string;
  definition: string;
}

const definitions: Record<string, TermDefinition> = {
  'social progress': {
    term: 'Social Progress',
    definition: 'The advancement of society toward greater equality, justice, and human wellbeing through collective action and institutional reform.'
  },
  'economic equity': {
    term: 'Economic Equity',
    definition: 'Fair distribution of economic resources and opportunities, ensuring everyone has access to basic needs and pathways to prosperity.'
  },
  'environmental justice': {
    term: 'Environmental Justice',
    definition: 'The fair treatment of all people regarding environmental policies, ensuring no group bears a disproportionate burden of environmental harm.'
  },
  'democratic renewal': {
    term: 'Democratic Renewal',
    definition: 'The process of strengthening democratic institutions and practices to ensure genuine representation and participation of all citizens.'
  },
  'mutual aid': {
    term: 'Mutual Aid',
    definition: 'Community-based support systems where people help each other meet basic needs and work together for collective wellbeing.'
  },
  'worker cooperatives': {
    term: 'Worker Cooperatives',
    definition: 'Businesses owned and democratically controlled by their employees, who share in decision-making and profits.'
  },
  'progressive taxation': {
    term: 'Progressive Taxation',
    definition: 'A tax system where higher earners pay higher tax rates, used to fund public services and reduce inequality.'
  },
  'ranked-choice voting': {
    term: 'Ranked-Choice Voting',
    definition: 'An electoral system where voters rank candidates by preference, promoting diverse candidates and reducing negative campaigning.'
  },
  'social infrastructure': {
    term: 'Social Infrastructure',
    definition: 'Public spaces and institutions like libraries, parks, and community centers that bring people together and strengthen communities.'
  }
};

function addTooltips(text: string): React.ReactNode {
  let result: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = Object.keys(definitions).sort((a, b) => b.length - a.length);
  
  for (const term of sortedTerms) {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
      
      // Add the tooltip component
      result.push(
        <Tooltip
          key={`${term}-${match.index}`}
          term={definitions[term.toLowerCase()].term}
          definition={definitions[term.toLowerCase()].definition}
        >
          {match[0]}
        </Tooltip>
      );
      
      lastIndex = match.index + match[0].length;
    }
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  
  return result.length > 0 ? result : text;
}

interface Section {
  id: string;
  title: string;
  summary: string;
  fullText: string;
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    summary: 'Social progress requires intentional action and collective commitment. We must move beyond passive observation to active participation in shaping a more equitable future.',
    fullText: 'Social progress is not an inevitable force of nature—it is the result of deliberate choices, sustained effort, and unwavering commitment to justice. Throughout history, every meaningful advancement in human rights, equality, and dignity has emerged from the courage of individuals who refused to accept the status quo. Today, we stand at a crossroads where passive observation is no longer sufficient. We must become active architects of change, building bridges across divides and creating pathways toward a more equitable and compassionate society. This manifesto outlines the principles and practices necessary to transform our world from one of scarcity and competition to one of abundance and collaboration.'
  },
  {
    id: 'equity',
    title: 'Economic Equity',
    summary: 'True economic justice means ensuring everyone has access to opportunities for prosperity, not just survival. We must restructure systems that concentrate wealth and power.',
    fullText: 'Economic equity is the foundation upon which all other forms of social progress rest. When vast segments of our population struggle to meet basic needs while others accumulate unprecedented wealth, we create conditions that undermine democracy, health, and human potential. True economic justice extends far beyond charity or temporary relief—it requires fundamental restructuring of systems that perpetuate inequality. We must reimagine economic models that prioritize human wellbeing over profit maximization, implement progressive taxation that funds robust public services, and create worker cooperatives that distribute both ownership and decision-making power. Only through such comprehensive reform can we build an economy that serves all people, not just the privileged few.'
  },
  {
    id: 'environment',
    title: 'Environmental Justice',
    summary: 'Climate action and social justice are inseparable. Environmental degradation disproportionately affects marginalized communities who contribute least to the problem.',
    fullText: 'Environmental justice recognizes that climate change is not a neutral phenomenon—it is deeply intertwined with existing systems of oppression and inequality. Communities of color, indigenous populations, and low-income neighborhoods bear the heaviest burden of pollution, extreme weather, and environmental degradation, despite contributing least to these problems. True environmental progress requires addressing these disparities head-on, ensuring that solutions benefit those most affected rather than further marginalizing them. We must transition to renewable energy while creating good jobs in affected communities, implement green infrastructure that improves public health in underserved areas, and center indigenous wisdom in our approach to land stewardship. Climate action that ignores social justice will ultimately fail both people and planet.'
  },
  {
    id: 'education',
    title: 'Educational Reform',
    summary: 'Education must prepare people for democratic participation and critical thinking, not just economic productivity. We need systems that nurture whole human beings.',
    fullText: 'Our educational system has been reduced to a narrow focus on standardized testing and job preparation, failing to develop the critical thinking, creativity, and civic engagement essential for a thriving democracy. True educational reform must reclaim education as a public good that develops the full potential of every human being. This means smaller class sizes that allow for personalized attention, curricula that include arts, philosophy, and civic education alongside STEM subjects, and teaching methods that encourage questioning and collaboration rather than passive consumption. We must also address educational inequity by ensuring all schools have adequate resources, experienced teachers, and safe learning environments. Education should prepare students not just to find jobs, but to become thoughtful citizens capable of shaping their communities and society.'
  },
  {
    id: 'democracy',
    title: 'Democratic Renewal',
    summary: 'Democracy requires active citizen participation and institutions that reflect the will of the people. We must combat voter suppression and corporate influence.',
    fullText: 'Democracy is not a spectator sport—it requires the active, informed participation of all citizens in shaping the decisions that affect their lives. Yet our current system often excludes voices, suppresses votes, and amplifies the influence of wealthy interests over ordinary people. Democratic renewal demands comprehensive reform: automatic voter registration, ranked-choice voting that encourages diverse candidates, public campaign financing that reduces the influence of big money, and redistricting processes that create competitive elections rather than safe seats. We must also strengthen local democracy by creating more opportunities for citizen participation in budgeting, planning, and policy-making. Only when every voice can be heard and every vote counts equally can we claim to live in a true democracy.'
  },
  {
    id: 'community',
    title: 'Community Building',
    summary: 'Strong communities are built through mutual aid, shared spaces, and collective action. We must invest in the social infrastructure that connects us.',
    fullText: 'In an era of increasing isolation and polarization, rebuilding community connections is essential for both individual wellbeing and collective progress. Strong communities don\'t emerge spontaneously—they require intentional investment in the social infrastructure that brings people together: public libraries, community centers, parks, local businesses, and gathering spaces where neighbors can meet and organize. Community building also means developing systems of mutual aid that help people weather crises together, creating inclusive spaces where all residents feel welcome regardless of background, and fostering a culture of collective responsibility for shared challenges. When communities are strong, they become powerful forces for positive change, capable of addressing local problems while contributing to broader movements for justice.'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-black tracking-tight">
            Analogies 28
          </h1>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-20 bottom-0 w-80 overflow-y-auto z-30">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-6">Manifesto Outline</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                    activeSection === section.id
                      ? 'border-2 border-blue-300 shadow-lg shadow-blue-200/50 text-black font-bold'
                      : 'text-black hover:bg-black/10'
                  }`}
                >
                  <span className="font-medium">{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-80 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-20 scroll-mt-32"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Full Text Column */}
                <div className="lg:pr-8">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-black mb-6 pb-3 border-b-2 border-black/20">
                      {section.title}
                    </h2>
                    <h3 className="text-lg font-semibold text-black mb-6">Full Text</h3>
                    <p className="text-black leading-relaxed text-base tracking-wide">
                      {addTooltips(section.fullText)}
                    </p>
                  </div>
                </div>

                {/* Summary Column */}
                <div className="lg:pl-8">
                  <div className="sticky top-32">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 shadow-lg shadow-blue-200/50 border-2 border-blue-300">
                      <h3 className="text-lg font-semibold text-black mb-4">Summary</h3>
                      <p className="text-black leading-relaxed text-lg">
                        {addTooltips(section.summary)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section Divider */}
              {index < sections.length - 1 && (
                <div className="mt-16 pt-8"></div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="ml-80">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <p className="text-black text-center">
            © 2025 Analogies 28. A manifesto for social progress.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;