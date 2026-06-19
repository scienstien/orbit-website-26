"use client";

import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { Briefcase, ContactRound, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type TeamName =
  | "Core"
  | "Aerostructures"
  | "Avionics"
  | "Operations"
  | "Design"
  | "WebOps"
  | "RnD";

type MemberRole =
  | "President"
  | "Vice President"
  | "Head"
  | "Manager"
  | "Coordinator"
  | "Alumni";

type Member = {
  name: string;
  state: {
    team: TeamName;
    role: MemberRole;
  };
  profileImage: string | null;
  linkedin: string;
  github: string;
  instagram: string;
};

const IMAGE_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDQwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzQwMCcgaGVpZ2h0PSc0MDAnIGZpbGw9JyMwYjEyMjAnLz48Y2lyY2xlIGN4PScyMDAnIGN5PScxNTAnIHI9JzYwJyBmaWxsPScjMWU0MDYwJy8+PHBhdGggZD0nTTEwMCAzMjBjMTgtNjAgNjMtOTAgMTAwLTkwczgyIDMwIDEwMCA5MCcgZmlsbD0nIzFlNDA2MCcvPjwvc3ZnPg==";

const profileImages: Record<string, string> = {
  "Sai Sudeep Notubilli": "/images/members/Sai Sudeep Notubilli.jpeg",
  Priyamvada: "/images/members/Pandravada.jpeg",
  "Aarushi Jaijith": "/images/members/Aarushi Jaijith.jpeg",
  "Srivishnu Janakiraman": "/images/members/Vishnu.jpeg",
  "Vaishnav Kaartik": "/images/members/Vaishnav S.jpg",
  Sriharini: "/images/members/Sriharini K.jpeg",
  "Giridhar Ajith": "/images/members/Giridhar Ajith.jpg",
  "Shruthi V": "/images/members/Shruthi V.jpg",
  "Bala Guru Prasaad B": "/images/members/Bala Guru Prasaad.jpg",
  "D.LALITVIKRAM": "/images/members/Lalit D.jpg",
  "Bala Aditya": "/images/members/Bala Aditya.jpeg",
  "Sriya Ghosh": "/images/members/Sriya Ghosh.jpeg",
  "Nikita Soni": "/images/members/Nikita Soni.jpg",
  "Thejas Muppala": "/images/members/Thejas Muppala.jpeg",
  "Arulpavalan S A": "/images/members/Arulpavalan S A.jpg",
  "Sharvesh S": "/images/members/Sharvesh S.jpeg",
  "Rohith Naidu": "/images/members/Rohith Naidu.jpg",
  "Shivangi Das": "/images/members/Shivangi Das.jpg",
  "Sajja Akshith": "/images/members/Akshith Sajja.jpeg",
  "Varun n krishna": "/images/members/Varun n Krishna.png",
  "Rishie V": "/images/members/Rishie V.png",
  Johan: "/images/members/Johan Suresh.jpeg",
  Bhadri: "/images/members/bhadri.jpeg",
  "Riya Singh": "/images/members/RIYA SINGH.webp",
  "Krishna Teja": "/images/members/Krishna Teja.jpg",
  "Parth Dinil": "/images/members/Parth Dinil.jpg",
};

const teamStyles: Record<
  TeamName,
  {
    activeTab: string;
    badge: string;
    sectionHeader: string;
  }
> = {
  Core: {
    activeTab:
      "bg-linear-to-r from-amber-200 to-yellow-300 text-black shadow-md",
    badge: "bg-amber-500/90",
    sectionHeader: "bg-linear-to-r from-amber-200 to-yellow-300",
  },
  Aerostructures: {
    activeTab:
      "bg-linear-to-r from-emerald-200 to-emerald-400 text-black shadow-md",
    badge: "bg-emerald-500/90",
    sectionHeader: "bg-linear-to-r from-emerald-200 to-emerald-400",
  },
  Avionics: {
    activeTab:
      "bg-linear-to-r from-indigo-200 to-indigo-400 text-black shadow-md",
    badge: "bg-indigo-500/90",
    sectionHeader: "bg-linear-to-r from-indigo-200 to-indigo-400",
  },
  Design: {
    activeTab:
      "bg-linear-to-r from-orange-200 to-orange-400 text-black shadow-md",
    badge: "bg-orange-500/90",
    sectionHeader: "bg-linear-to-r from-orange-200 to-orange-400",
  },
  Operations: {
    activeTab:
      "bg-linear-to-r from-purple-200 to-purple-400 text-black shadow-md",
    badge: "bg-purple-500/90",
    sectionHeader: "bg-linear-to-r from-purple-200 to-purple-400",
  },
  RnD: {
    activeTab: "bg-linear-to-r from-cyan-200 to-cyan-400 text-black shadow-md",
    badge: "bg-cyan-500/90",
    sectionHeader: "bg-linear-to-r from-cyan-200 to-cyan-400",
  },
  WebOps: {
    activeTab: "bg-linear-to-r from-rose-200 to-rose-400 text-black shadow-md",
    badge: "bg-rose-500/90",
    sectionHeader: "bg-linear-to-r from-rose-200 to-rose-400",
  },
};

const members: Member[] = [
  {
    name: "President Placeholder",
    state: {
      team: "Core",

      role: "President",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
  {
    name: "Vice President Placeholder",
    state: {
      team: "Core",

      role: "Vice President",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
  {
    name: "Johan",
    state: {
      team: "Aerostructures",

      role: "Head",
    },
    profileImage: profileImages.Johan,
    linkedin: "https://www.linkedin.com/in/johansuresh/",
    github: "",
    instagram: "",
  },
  {
    name: "Bhadri",
    state: {
      team: "Avionics",

      role: "Head",
    },
    profileImage: profileImages.Bhadri,
    linkedin: "https://www.linkedin.com/in/bhadrinathan-v-t-176591264/",
    github: "",
    instagram: "https://www.instagram.com/bhadrinathan61/",
  },
  {
    name: "Riya Singh",
    state: {
      team: "Aerostructures",

      role: "Manager",
    },
    profileImage: profileImages["Riya Singh"],
    linkedin: "https://www.linkedin.com/in/riya-singh-167b3a313",
    github: "",
    instagram: "the_word_shaker_riya",
  },
  {
    name: "Ankith",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
  {
    name: "Sriya Ghosh",
    state: {
      team: "Aerostructures",

      role: "Manager",
    },
    profileImage: profileImages["Sriya Ghosh"],
    linkedin: "https://www.linkedin.com/in/sriya-ghosh-0a93792a3",
    github: "",
    instagram: "",
  },
  {
    name: "Shivangi Das",
    state: {
      team: "Aerostructures",

      role: "Manager",
    },
    profileImage: profileImages["Shivangi Das"],
    linkedin: "https://www.linkedin.com/in/shivangi-das-7b633b298",
    github: "",
    instagram: "_shivangii_x_",
  },
  {
    name: "Rohith Naidu",
    state: {
      team: "Avionics",

      role: "Manager",
    },
    profileImage: profileImages["Rohith Naidu"],
    linkedin: "https://www.linkedin.com/in/rohith-naidu-3825b32a6",
    github: "",
    instagram: "rohithnaidu19",
  },
  {
    name: "Sharvesh S",
    state: {
      team: "Design",

      role: "Head",
    },
    profileImage: profileImages["Sharvesh S"],
    linkedin: "https://www.linkedin.com/in/sharvesh-s-208a50258",
    github: "",
    instagram: "",
  },
  {
    name: "Krishna Teja",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["Krishna Teja"],
    linkedin: "https://www.linkedin.com/in/krishna-teja-krosuri-b450b4316",
    github: "https://github.com/krishnateja3369",
    instagram: "krishna_012007",
  },
  {
    name: "Sai Sudeep Notubilli",
    state: {
      team: "Aerostructures",

      role: "Manager",
    },
    profileImage: profileImages["Sai Sudeep Notubilli"],
    linkedin: "https://www.linkedin.com/in/sai-sudeep-notubilli-5a150826b",
    github: "",
    instagram: "@sud_eep._",
  },
  {
    name: "Priyamvada",
    state: {
      team: "Operations",

      role: "Manager",
    },
    profileImage: profileImages.Priyamvada,
    linkedin: "https://www.linkedin.com/in/pandravada-priyamvada-51a169311",
    github: "",
    instagram: "pri_yumm_vada",
  },
  {
    name: "Aarushi Jaijith",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages["Aarushi Jaijith"],
    linkedin: "https://www.linkedin.com/in/aarushi-jaijith-36b781351",
    github: "https://github.com/AarushiJaijith",
    instagram: "ashii.3010",
  },
  {
    name: "Srivishnu Janakiraman",
    state: {
      team: "Aerostructures",

      role: "Head",
    },
    profileImage: profileImages["Srivishnu Janakiraman"],
    linkedin: "https://www.linkedin.com/in/srivishnujanakiraman",
    github: "",
    instagram: "vishnnuuuuuuuuuu",
  },
  {
    name: "Rishie V",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages["Rishie V"],
    linkedin: "https://www.linkedin.com/in/rishie-v-18420a322",
    github: "https://github.com/rishiev2k7",
    instagram: "rishie_2k7",
  },
  {
    name: "Vaishnav Kaartik",
    state: {
      team: "Operations",

      role: "Head",
    },
    profileImage: profileImages["Vaishnav Kaartik"],
    linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
    github: "",
    instagram: "@vk004_",
  },
  {
    name: "Sriharini",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages.Sriharini,
    linkedin: "https://www.linkedin.com/in/sriharini-karthikeyan-5a26b6351",
    github: "",
    instagram: "blueberrymuffins22",
  },
  {
    name: "Giridhar Ajith",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["Giridhar Ajith"],
    linkedin: "https://www.linkedin.com/in/giridhar-ajith-551295353",
    github: "",
    instagram: "@bakasarutobi",
  },
  {
    name: "Shruthi V",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages["Shruthi V"],
    linkedin: "https://in.linkedin.com/in/shruthi-v-067222325",
    github: "",
    instagram: "titanium_2967",
  },
  {
    name: "Bala Guru Prasaad B",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["Bala Guru Prasaad B"],
    linkedin: "https://www.linkedin.com/in/bala-guru-prasaad-b-517b7031b",
    github: "",
    instagram: "bala_guru_prasaad",
  },
  {
    name: "D.LALITVIKRAM",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["D.LALITVIKRAM"],
    linkedin: "https://www.linkedin.com/in/d-lalitvikram-48a361372",
    github: "",
    instagram: "lalit_____vikram",
  },
  {
    name: "Bala Aditya",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["Bala Aditya"],
    linkedin: "https://www.linkedin.com/in/bala-aditya-mylavarapu/",
    github: "",
    instagram: "aditya_mylavarap",
  },
  {
    name: "Parth Dinil",
    state: {
      team: "Aerostructures",

      role: "Coordinator",
    },
    profileImage: profileImages["Parth Dinil"],
    linkedin: "https://www.linkedin.com/in/parth-dinil",
    github: "",
    instagram: "@i.m_p.arth",
  },
  {
    name: "Nikita Soni",
    state: {
      team: "Design",

      role: "Coordinator",
    },
    profileImage: profileImages["Nikita Soni"],
    linkedin: "https://www.linkedin.com/in/nikita-soni-4180b4329",
    github: "",
    instagram: "pixelita_edit",
  },
  {
    name: "Varun n krishna",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages["Varun n krishna"],
    linkedin: "https://www.linkedin.com/in/varun-n-krishna-3b06a2336",
    github: "https://github.com/VarunnKrishna2006",
    instagram: "krishnavarunn",
  },
  {
    name: "Sajja Akshith",
    state: {
      team: "Aerostructures",

      role: "Manager",
    },
    profileImage: profileImages["Sajja Akshith"],
    linkedin: "https://linkedin.com/in/sajjaakshith",
    github: "",
    instagram: "",
  },
  {
    name: "Thejas Muppala",
    state: {
      team: "Avionics",

      role: "Manager",
    },
    profileImage: profileImages["Thejas Muppala"],
    linkedin: "https://www.linkedin.com/feed/",
    github: "https://github.com/Thejas2006",
    instagram: "its_thejas_10",
  },
  {
    name: "Arulpavalan S A",
    state: {
      team: "Avionics",

      role: "Coordinator",
    },
    profileImage: profileImages["Arulpavalan S A"],
    linkedin: "https://www.linkedin.com/in/arulpavalan-s-a-7469932a1/",
    github: "https://github.com/ArulpavalanSA",
    instagram: "arul_pavalan",
  },
  {
    name: "WebOps Member",
    state: {
      team: "WebOps",

      role: "Coordinator",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
  {
    name: "RnD Member",
    state: {
      team: "RnD",

      role: "Coordinator",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
  {
    name: "Alumni Member",
    state: {
      team: "Aerostructures",

      role: "Alumni",
    },
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
  },
];

const CURRENT_TEAM_TAB = "Our Current Team" as const;
const ALUMNI_TAB = "Alumni" as const;

type DirectoryTab = TeamName | typeof CURRENT_TEAM_TAB | typeof ALUMNI_TAB;

const teamOrder: TeamName[] = [
  "Core",
  "Aerostructures",
  "Avionics",
  "Operations",
  "Design",
  "WebOps",
  "RnD",
];

const currentRoleOrder: MemberRole[] = [
  "President",
  "Vice President",
  "Head",
  "Manager",
  "Coordinator",
];

const defaultActiveTab =
  "bg-linear-to-r from-blue-200 to-cyan-300 text-black shadow-md";
const inactiveTab = "bg-white/10 text-white hover:bg-white/20";
const alumniSectionHeader = "bg-linear-to-r from-blue-200 to-cyan-300";

function sortTeams(teams: TeamName[]) {
  return teams.sort((firstTeam, secondTeam) => {
    const firstIndex = teamOrder.indexOf(firstTeam);
    const secondIndex = teamOrder.indexOf(secondTeam);

    if (firstIndex === -1 && secondIndex === -1) {
      return firstTeam.localeCompare(secondTeam);
    }

    if (firstIndex === -1) {
      return 1;
    }

    if (secondIndex === -1) {
      return -1;
    }

    return firstIndex - secondIndex;
  });
}

function isAlumni(member: Member) {
  return member.state.role === "Alumni";
}

function getRoleLabel(role: MemberRole) {
  if (role === "Alumni") {
    return "Alumni";
  }

  return role;
}

function getRoleHeading(role: MemberRole, count: number) {
  if (role === "President") {
    return `President (${count})`;
  }

  if (role === "Vice President") {
    return `Vice President (${count})`;
  }

  if (role === "Head") {
    return `Heads (${count})`;
  }

  if (role === "Alumni") {
    return `Alumni (${count})`;
  }

  return `${role}s (${count})`;
}

function getTabStyle(tab: DirectoryTab, isSelected: boolean) {
  if (!isSelected) {
    return inactiveTab;
  }

  if (tab === CURRENT_TEAM_TAB || tab === ALUMNI_TAB) {
    return defaultActiveTab;
  }

  return teamStyles[tab].activeTab;
}

function getImageCaption(member: Member) {
  if (member.profileImage) {
    return null;
  }

  return member.state.role === "Alumni"
    ? "Alumni profile pending"
    : "Profile image pending";
}

function MemberPhoto({ member }: { member: Member }) {
  const [isLoaded, setIsLoaded] = useState(!member.profileImage);

  return (
    <div className="relative h-72 sm:h-80 md:h-96 bg-slate-900">
      {!isLoaded ? (
        <div
          className="absolute inset-0 z-10 animate-pulse bg-linear-to-br from-slate-800 via-slate-700 to-slate-950"
          aria-hidden="true"
        />
      ) : null}

      {member.profileImage ? (
        <Image
          fill
          src={member.profileImage}
          alt={`${member.name}, ${member.state.team} ${member.state.role}`}
          loading="lazy"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
          quality={75}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover object-[50%_40%] transition duration-500 ${
            isLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-800 via-slate-900 to-indigo-950">
          <User
            className="h-24 w-24 text-white/75 sm:h-32 sm:w-32"
            strokeWidth={1.5}
          />
        </div>
      )}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const imageCaption = getImageCaption(member);

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-white/25">
      <div className="relative">
        <MemberPhoto member={member} />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-lg leading-tight">
            {member.name}
          </h3>
          <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
            <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              {getRoleLabel(member.state.role)}
            </span>
            <span
              className={`text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${teamStyles[member.state.team].badge}`}
            >
              {member.state.team}
            </span>
          </div>

          {imageCaption ? (
            <p className="text-xs sm:text-sm text-white/90 italic mb-2 sm:mb-3 line-clamp-2">
              {imageCaption}
            </p>
          ) : null}

          <div className="flex gap-2 sm:gap-3">
            {member.linkedin && member.linkedin !== "NA" ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <ContactRound className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
            {member.github && member.github !== "NA" ? (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} GitHub`}
              >
                <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
            {member.instagram ? (
              <a
                href={
                  member.instagram.startsWith("http")
                    ? member.instagram
                    : `https://instagram.com/${member.instagram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} Instagram`}
              >
                <SiInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
  const [selectedTeam, setSelectedTeam] =
    useState<DirectoryTab>(CURRENT_TEAM_TAB);

  const currentMembers = members.filter((member) => !isAlumni(member));
  const alumniMembers = members.filter(isAlumni);
  const subTeams = sortTeams([
    ...new Set(currentMembers.map((member) => member.state.team)),
  ]);
  const allTabs: DirectoryTab[] = [CURRENT_TEAM_TAB, ...subTeams, ALUMNI_TAB];

  const isCurrentTeamTab = selectedTeam === CURRENT_TEAM_TAB;
  const isAlumniTab = selectedTeam === ALUMNI_TAB;

  const filteredMembers = isCurrentTeamTab
    ? currentMembers
    : isAlumniTab
      ? alumniMembers
      : currentMembers.filter((member) => member.state.team === selectedTeam);

  const groupedMembers = filteredMembers.reduce<
    Partial<Record<TeamName, Partial<Record<MemberRole, Member[]>>>>
  >((acc, member) => {
    const teamKey = member.state.team;
    const roleKey = member.state.role;

    if (!acc[teamKey]) {
      acc[teamKey] = {};
    }

    const teamMembers = acc[teamKey] as Partial<Record<MemberRole, Member[]>>;
    if (!teamMembers[roleKey]) {
      teamMembers[roleKey] = [];
    }

    const roleMembers = teamMembers[roleKey] as Member[];
    roleMembers.push(member);
    return acc;
  }, {});

  const sortedTeams = sortTeams(Object.keys(groupedMembers) as TeamName[]);

  return (
    <section className="min-h-screen p-3 sm:p-6" aria-labelledby="team-heading">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-4">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Team Directory
          </p>
          <h2 id="team-heading" className="mt-3 text-4xl font-bold sm:text-6xl">
            Meet Orbit NIT Trichy
          </h2>
        </div>

        <div className="mb-6 rounded-lg border border-white/10 bg-white/10 p-2 shadow-lg shadow-black/25 backdrop-blur sm:mb-8">
          <div className="flex overflow-x-auto gap-2 pb-1 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {allTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTeam(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap shrink-0 text-sm sm:text-base flex items-center gap-1.5 ${
                  selectedTeam === tab
                    ? getTabStyle(tab, true)
                    : getTabStyle(tab, false)
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {isAlumniTab ? (
          <div className="mb-6 sm:mb-8 mt-3 sm:mt-5 pt-2 sm:pt-4">
            <div
              className={`${alumniSectionHeader} rounded-lg shadow-lg p-4 sm:p-6 mb-4`}
            >
              <h2 className="text-lg sm:text-2xl font-bold text-black flex items-center gap-2 sm:gap-3">
                <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" />
                Alumni
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {alumniMembers.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        ) : null}

        {!isAlumniTab
          ? sortedTeams.map((team) => (
              <div
                key={team}
                className="mb-6 sm:mb-8 mt-3 sm:mt-5 pt-2 sm:pt-4"
              >
                <div
                  className={`${teamStyles[team].sectionHeader} rounded-lg shadow-lg p-4 sm:p-6 mb-4`}
                >
                  <h2 className="text-lg sm:text-2xl font-bold text-black flex items-center gap-2 sm:gap-3">
                    <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" />
                    {team}
                  </h2>
                </div>

                {currentRoleOrder
                  .filter((role) => groupedMembers[team]?.[role])
                  .map((role) => (
                    <div key={role} className="mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-3 ml-1 sm:ml-2">
                        {getRoleHeading(
                          role,
                          groupedMembers[team]?.[role]?.length ?? 0,
                        )}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {groupedMembers[team]?.[role]?.map((member) => (
                          <MemberCard key={member.name} member={member} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))
          : null}
      </div>
    </section>
  );
}
