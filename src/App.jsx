import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Radar,
  Sun,
  Moon,
  Download,
  Database,
  Percent,
  SlidersHorizontal,
  AlertTriangle,
  ShieldCheck,
  Play,
  Layers,
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Award,
  RotateCcw,
  Smartphone,
  Share,
  PlusSquare,
  Check,
  WifiOff,
  MonitorDown
} from 'lucide-react';

// ============================================================================
// VOLUME METADATA SPECIFICATIONS (MATS PART 3 VOL II - VOL V)
// ============================================================================
const VOLUME_SPECS = [
  {
    volume: 'Volume II',
    shortLabel: 'Vol. II',
    title: 'ATS General Provisions & Separation',
    sections: ['Sec. 3 General Provisions', 'Sec. 4 Separation Minima']
  },
  {
    volume: 'Volume III',
    shortLabel: 'Vol. III',
    title: 'Aerodrome Control Procedures',
    sections: ['Sec. 5 Vicinity of Aerodromes', 'Sec. 6 TWR Control Service']
  },
  {
    volume: 'Volume IV',
    shortLabel: 'Vol. IV',
    title: 'ATS Surveillance, FIS & Coordination',
    sections: ['Sec. 7 ATS Surveillance', 'Sec. 8 FIS & Alerting', 'Sec. 9 Coordination']
  },
  {
    volume: 'Volume V',
    shortLabel: 'Vol. V',
    title: 'Communications & Contingency Procedures',
    sections: ['Sec. 10 ATS Messages', 'Sec. 11 Phraseologies', 'Sec. 12-13 ADS-C/CPDLC', 'Sec. 14-15 Contingency/INMC']
  }
];

const DIFFICULTY_LEVELS = [
  { id: 'ALL', label: 'All Levels' },
  { id: 'Easy', label: 'Easy (Foundational)' },
  { id: 'Medium', label: 'Medium (Procedural)' },
  { id: 'Hard', label: 'Hard (Operational Scenarios)' }
];

const SESSION_SIZE_OPTIONS = [10, 20, 30, 50];

// ============================================================================
// VERIFIED QUESTION BANK (100% UNIQUE, ICAO AVIATION ENGLISH)
// ============================================================================
const RAW_QUESTIONS = [
  // -------------------- VOLUME II --------------------
  {
    id: 'MATS-V2-001',
    volume: 'Volume II',
    category: 'Sec. 3.1 Area Control Service',
    reference: 'MATS Part 3 Vol. II, 3.1.1',
    difficulty: 'Easy',
    question: 'In accordance with MATS Part 3 Volume II Section 3.1.1, which AirNav Indonesia ATS units provide Area Control Service (ACC) and what are their designated vertical limits?',
    options: [
      { text: 'Jakarta ACC (FL 150–FL 600) and Surabaya ACC (FL 245–FL 600)', isCorrect: false },
      { text: 'Jakarta ACC (FL 245–FL 600) and Ujung Pandang ACC (FL 245–FL 600)', isCorrect: true },
      { text: 'Jakarta ACC (FL 245–FL 460), Medan ACC (FL 245–FL 600), and Ujung Pandang ACC (FL 245–FL 600)', isCorrect: false },
      { text: 'JATSC ACC (FL 100–FL 600) and MATSC ACC (FL 100–FL 600)', isCorrect: false }
    ],
    explanation: 'Table 3.1.1 designates two Area Control Centres in Indonesia: Jakarta ACC (JATSC) and Ujung Pandang ACC (MATSC), each responsible for its respective CTA from FL 245 to FL 600.'
  },
  {
    id: 'MATS-V2-002',
    volume: 'Volume II',
    category: 'Sec. 3.1 Approach Control Service',
    reference: 'MATS Part 3 Vol. II, 3.1.2',
    difficulty: 'Easy',
    question: 'Which Approach Control (APP) unit is responsible for providing APP Surveillance service for Mozes Kilangin Airport (Timika) and Frans Kaisiepo Airport (Biak)?',
    options: [
      { text: 'Sultan Hasanuddin APP (MATSC)', isCorrect: false },
      { text: 'Sentani APP', isCorrect: true },
      { text: 'Pattimura APP (Ambon)', isCorrect: false },
      { text: 'Sam Ratulangi APP (Manado)', isCorrect: false }
    ],
    explanation: 'Pursuant to Table 3.1.2 (Items 38–40), APP Surveillance service for Sorong, Timika, and Biak is provided by Sentani APP.'
  },
  {
    id: 'MATS-V2-003',
    volume: 'Volume II',
    category: 'Sec. 3.3 Transfer of Control',
    reference: 'MATS Part 3 Vol. II, 3.3.2.1.1',
    difficulty: 'Medium',
    question: 'Control of an arriving aircraft shall be transferred from the unit providing approach control service to the aerodrome control tower when the aircraft meets any of the following conditions, EXCEPT:',
    options: [
      { text: 'It is in the vicinity of the aerodrome and approach and landing will be completed in visual reference to the ground', isCorrect: false },
      { text: 'It has reached uninterrupted visual meteorological conditions (VMC)', isCorrect: false },
      { text: 'It is at a prescribed point or level as specified in Letters of Agreement (LoA) or unit SOP', isCorrect: false },
      { text: 'It has just entered the outer lateral boundary of the TMA at FL 200 in instrument meteorological conditions (IMC)', isCorrect: true }
    ],
    explanation: 'Transfer of control from APP to TWR occurs when the arriving aircraft is in the vicinity of the aerodrome with visual reference/uninterrupted VMC, at a prescribed point or level per LoA/SOP, or has landed.'
  },
  {
    id: 'MATS-V2-004',
    volume: 'Volume II',
    category: 'Sec. 3.4 Flight Plan Delay',
    reference: 'MATS Part 3 Vol. II, 3.4.2.2',
    difficulty: 'Medium',
    question: 'In the event of a delay beyond the Estimated Off-Block Time (EOBT), the flight plan shall be amended or a new flight plan submitted if the delay exceeds:',
    options: [
      { text: '15 minutes for a controlled flight and 30 minutes for an uncontrolled flight', isCorrect: false },
      { text: '30 minutes for a controlled flight and 1 hour for an uncontrolled flight', isCorrect: true },
      { text: '45 minutes for a controlled flight and 90 minutes for an uncontrolled flight', isCorrect: false },
      { text: '60 minutes for a controlled flight and 2 hours for an uncontrolled flight', isCorrect: false }
    ],
    explanation: 'In accordance with Flight Plan provisions (Sec. 3.4 / ICAO Doc 4444), a delay exceeding 30 minutes for a controlled flight or 1 hour for an uncontrolled flight requires flight plan modification or cancellation.'
  },
  {
    id: 'MATS-V2-005',
    volume: 'Volume II',
    category: 'Sec. 3.6 Horizontal Speed Control',
    reference: 'MATS Part 3 Vol. II, 3.6.3.3',
    difficulty: 'Medium',
    question: 'During initial descent from cruising level, what is the minimum indicated airspeed (IAS) that a controller may instruct a turbojet aircraft to maintain without prior flight crew agreement?',
    options: [
      { text: '210 kt IAS', isCorrect: false },
      { text: '220 kt IAS', isCorrect: false },
      { text: '250 kt IAS (460 km/h)', isCorrect: true },
      { text: '280 kt IAS (520 km/h)', isCorrect: false }
    ],
    explanation: 'Sec. 3.6.3.3 stipulates that controllers shall not issue speed reduction instructions to less than 460 km/h (250 kt) IAS during initial descent from cruising level for turbojet aircraft unless agreed to by the flight crew.'
  },
  {
    id: 'MATS-V2-006',
    volume: 'Volume II',
    category: 'Sec. 3.6 Approach Speed Control',
    reference: 'MATS Part 3 Vol. II, 3.6.3.5 & 3.6.3.7',
    difficulty: 'Hard',
    question: 'Below 4 550 m (FL 150), speed reductions for arriving turbojet aircraft shall not be less than what speed, and beyond what distance from the runway threshold on final approach shall speed control no longer be applied?',
    options: [
      { text: 'Not less than 220 kt IAS; not applied after passing 4 NM (7 km) from the threshold', isCorrect: true },
      { text: 'Not less than 200 kt IAS; not applied after passing 3 NM (5 km) from the threshold', isCorrect: false },
      { text: 'Not less than 210 kt IAS; not applied after passing 5 NM (9.3 km) from the threshold', isCorrect: false },
      { text: 'Not less than 230 kt IAS; not applied after passing 2 NM (3.7 km) from the threshold', isCorrect: false }
    ],
    explanation: 'Sec. 3.6.3.5 establishes a minimum of 410 km/h (220 kt) IAS below FL 150, while Sec. 3.6.3.7 prohibits applying speed control once an aircraft has passed 7 km (4 NM) from the threshold on final approach.'
  },
  {
    id: 'MATS-V2-007',
    volume: 'Volume II',
    category: 'Sec. 3.9 Wake Turbulence',
    reference: 'MATS Part 3 Vol. II, 3.9.1.1',
    difficulty: 'Easy',
    question: 'According to wake turbulence categorization based on Maximum Certificated Take-Off Mass (MCTOM), which mass range defines the MEDIUM (M) wake turbulence category?',
    options: [
      { text: '7 000 kg (15 500 lb) or less', isCorrect: false },
      { text: 'More than 7 000 kg (15 500 lb) and less than 136 000 kg (300 000 lb)', isCorrect: true },
      { text: 'More than 18 600 kg and less than 136 000 kg', isCorrect: false },
      { text: '136 000 kg (300 000 lb) or more', isCorrect: false }
    ],
    explanation: 'Sec. 3.9.1.1 c) defines MEDIUM (M) aircraft types as those having an MCTOM of less than 136 000 kg (300 000 lb) and more than 7 000 kg (15 500 lb).'
  },
  {
    id: 'MATS-V2-008',
    volume: 'Volume II',
    category: 'Sec. 3.9 Wake Turbulence Call Sign',
    reference: 'MATS Part 3 Vol. II, 3.9.2',
    difficulty: 'Easy',
    question: 'For which wake turbulence categories shall the word "SUPER" or "HEAVY" be included immediately after the aircraft call sign in the initial radiotelephony contact with ATS units?',
    options: [
      { text: 'SUPER category aircraft only', isCorrect: false },
      { text: 'SUPER and HEAVY categories (equivalent to Wake Turbulence Groups A, B, and C)', isCorrect: true },
      { text: 'SUPER, HEAVY, and UPPER MEDIUM categories', isCorrect: false },
      { text: 'All wide-body aircraft exceeding 100 000 kg MCTOM', isCorrect: false }
    ],
    explanation: 'Sec. 3.9.2 mandates including "super" or "heavy" immediately after the aircraft call sign upon initial radiotelephony contact for SUPER (Group A) and HEAVY (Groups B and C) aircraft.'
  },
  {
    id: 'MATS-V2-009',
    volume: 'Volume II',
    category: 'Sec. 3.10 Altimeter Setting',
    reference: 'MATS Part 3 Vol. II, 3.10.1.1',
    difficulty: 'Medium',
    question: 'While an aircraft is passing through the transition layer in the vicinity of an aerodrome or within a Terminal Control Area (TMA), how shall its vertical position be expressed?',
    options: [
      { text: 'Always in altitudes whether climbing or descending', isCorrect: false },
      { text: 'Always in flight levels whether climbing or descending', isCorrect: false },
      { text: 'In flight levels when climbing and in altitudes when descending', isCorrect: true },
      { text: 'In altitudes when climbing and in flight levels when descending', isCorrect: false }
    ],
    explanation: 'Sec. 3.10.1.1 prescribes that while aircraft are passing through the transition layer, vertical position shall be expressed in terms of flight levels when climbing and in terms of altitudes when descending.'
  },
  {
    id: 'MATS-V2-010',
    volume: 'Volume II',
    category: 'Sec. 3.12 Routine & Special Air-Reports',
    reference: 'MATS Part 3 Vol. II, 3.12.3',
    difficulty: 'Medium',
    question: 'Which meteorological phenomenon requires the flight crew to transmit a Special Air-Report (AIREP SPECIAL) as soon as practicable upon observation?',
    options: [
      { text: 'Light turbulence and isolated cumulus humilis clouds', isCorrect: false },
      { text: 'Moderate or severe turbulence, severe icing, severe mountain wave, or volcanic ash cloud', isCorrect: true },
      { text: 'Wind direction shift of less than 10 degrees at cruising level', isCorrect: false },
      { text: 'Outside Air Temperature (OAT) 2°C warmer than ISA standard', isCorrect: false }
    ],
    explanation: 'Sec. 3.12.3 requires AIREP SPECIAL reports whenever moderate or severe turbulence, severe icing, severe mountain waves, thunderstorms with/without hail, wind shear, or volcanic ash clouds are encountered.'
  },
  {
    id: 'MATS-V2-011',
    volume: 'Volume II',
    category: 'Sec. 4.3 Vertical Separation Minimum',
    reference: 'MATS Part 3 Vol. II, 4.3.2',
    difficulty: 'Easy',
    question: 'Within designated Reduced Vertical Separation Minimum (RVSM) airspace, what is the standard Vertical Separation Minimum (VSM) applied below FL 410?',
    options: [
      { text: '150 m (500 ft)', isCorrect: false },
      { text: '300 m (1 000 ft)', isCorrect: true },
      { text: '600 m (2 000 ft)', isCorrect: false },
      { text: '1 200 m (4 000 ft)', isCorrect: false }
    ],
    explanation: 'Sec. 4.3.2 b) establishes a nominal VSM of 300 m (1 000 ft) below FL 410 within designated RVSM airspace subject to regional air navigation agreement, and 600 m (2 000 ft) at or above FL 410.'
  },
  {
    id: 'MATS-V2-012',
    volume: 'Volume II',
    category: 'Sec. 4.4 Lateral Separation (VOR/NDB)',
    reference: 'MATS Part 3 Vol. II, 4.4.1.2.1.1',
    difficulty: 'Medium',
    question: 'When applying lateral separation using the same ground-based navigation aid, what minimum track divergence and minimum distance from the facility are required for VOR and NDB respectively?',
    options: [
      { text: 'VOR: tracks diverge by at least 15° at a distance ≥ 15 NM (28 km); NDB: tracks diverge by at least 30° at a distance ≥ 15 NM (28 km)', isCorrect: true },
      { text: 'VOR: tracks diverge by at least 10° at a distance ≥ 10 NM; NDB: tracks diverge by at least 15° at a distance ≥ 15 NM', isCorrect: false },
      { text: 'VOR: tracks diverge by at least 30° at a distance ≥ 15 NM; NDB: tracks diverge by at least 45° at a distance ≥ 20 NM', isCorrect: false },
      { text: 'Both VOR and NDB require a minimum track divergence of 15° at a distance ≥ 20 NM', isCorrect: false }
    ],
    explanation: 'Sec. 4.4.1.2.1.1 specifies lateral separation by VOR when tracks diverge by at least 15° and at least one aircraft is 28 km (15 NM) or more from the facility; for NDB, tracks must diverge by at least 30° at 28 km (15 NM) or more.'
  },
  {
    id: 'MATS-V2-013',
    volume: 'Volume II',
    category: 'Sec. 4.4 Longitudinal Separation (Time)',
    reference: 'MATS Part 3 Vol. II, 4.4.2.2.1.1',
    difficulty: 'Medium',
    question: 'For aircraft maintaining the same level on the same track, what is the minimum time-based longitudinal separation when the preceding aircraft maintains a True Airspeed (TAS) of 40 kt (74 km/h) or more faster than the succeeding aircraft after reporting over the same significant point?',
    options: [
      { text: '10 minutes', isCorrect: false },
      { text: '5 minutes', isCorrect: false },
      { text: '3 minutes', isCorrect: true },
      { text: '2 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 4.4.2.2.1.1 d) permits a 3-minute longitudinal separation minimum when the preceding aircraft maintains a TAS of 74 km/h (40 kt) or more faster than the succeeding aircraft (5 minutes applies if ≥ 20 kt faster).'
  },
  {
    id: 'MATS-V2-014',
    volume: 'Volume II',
    category: 'Sec. 4.4 Longitudinal Separation (DME/GNSS)',
    reference: 'MATS Part 3 Vol. II, 4.4.2.3.3.1',
    difficulty: 'Medium',
    question: 'What is the minimum distance-based longitudinal separation using DME and/or GNSS for aircraft at the same level on the same track when the preceding aircraft maintains a TAS of 20 kt (37 km/h) or more faster than the succeeding aircraft?',
    options: [
      { text: '9.3 km (5 NM)', isCorrect: false },
      { text: '19 km (10 NM)', isCorrect: true },
      { text: '37 km (20 NM)', isCorrect: false },
      { text: '55.5 km (30 NM)', isCorrect: false }
    ],
    explanation: 'Sec. 4.4.2.3.3.1 b) sets a 19 km (10 NM) minimum using simultaneous DME and/or GNSS readings when the preceding aircraft is at least 37 km/h (20 kt) faster; otherwise the standard minimum is 37 km (20 NM).'
  },
  {
    id: 'MATS-V2-015',
    volume: 'Volume II',
    category: 'Sec. 4.4 Mach Number Technique',
    reference: 'MATS Part 3 Vol. II, 4.4.2.4.3',
    difficulty: 'Hard',
    question: 'When applying time-based longitudinal separation with the Mach Number Technique (MNT) on the same track, if the preceding aircraft is flying Mach 0.03 faster than the succeeding aircraft, what minimum longitudinal separation is required at the entry point?',
    options: [
      { text: '10 minutes', isCorrect: false },
      { text: '8 minutes', isCorrect: false },
      { text: '7 minutes', isCorrect: true },
      { text: '5 minutes', isCorrect: false }
    ],
    explanation: 'Under MNT reduction rules (Sec. 4.4.2.4), the base 10-minute minimum may be reduced by 1 minute for each Mach 0.01 speed advantage of the preceding aircraft: Mach 0.01 = 9 min, Mach 0.02 = 8 min, Mach 0.03 = 7 min.'
  },
  {
    id: 'MATS-V2-016',
    volume: 'Volume II',
    category: 'Sec. 4.4 ADS-C Climb & Descend Procedure',
    reference: 'MATS Part 3 Vol. II, 4.4.2.8.1',
    difficulty: 'Hard',
    question: 'When applying the ADS-C Climb and Descend Procedure (CDP) on the same track, what minimum longitudinal distance is required when the following aircraft is not more than 10 kt or Mach 0.02 faster than the preceding aircraft?',
    options: [
      { text: '15 NM (27.8 km) with a maximum altitude difference of 1 000 ft', isCorrect: false },
      { text: '25 NM (46.3 km) with a maximum altitude difference of 2 000 ft and vertical separation re-established within 15 minutes', isCorrect: true },
      { text: '30 NM (55.5 km) with a maximum altitude difference of 2 000 ft and vertical separation re-established within 10 minutes', isCorrect: false },
      { text: '50 NM (93 km) with position accuracy of Figure of Merit 4 or higher', isCorrect: false }
    ],
    explanation: 'Sec. 4.4.2.8.1 requires at least 46.3 km (25 NM) when the following aircraft is ≤ 10 kt or Mach 0.02 faster (or 15 NM if the preceding aircraft is same speed/faster), altitude difference ≤ 600 m (2 000 ft), FoM ≥ 6, and vertical separation re-established within 15 minutes.'
  },
  {
    id: 'MATS-V2-017',
    volume: 'Volume II',
    category: 'Sec. 4.6 Separation Between Departing Aircraft',
    reference: 'MATS Part 3 Vol. II, 4.6.1 & 4.6.2',
    difficulty: 'Easy',
    question: 'What is the minimum time separation required between two departing aircraft when their tracks will diverge by at least 45 degrees immediately after take-off?',
    options: [
      { text: '1 minute', isCorrect: true },
      { text: '2 minutes', isCorrect: false },
      { text: '3 minutes', isCorrect: false },
      { text: '5 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 4.6.1 requires 1-minute separation between departing aircraft if tracks diverge by at least 45 degrees immediately after take-off (2 minutes applies on the same track if the preceding aircraft is ≥ 40 kt faster).'
  },
  {
    id: 'MATS-V2-018',
    volume: 'Volume II',
    category: 'Sec. 4.7 Departing vs Arriving Aircraft',
    reference: 'MATS Part 3 Vol. II, 4.7.1.3',
    difficulty: 'Hard',
    question: 'When an arriving aircraft is following an RNAV or RNP instrument flight procedure and a departing aircraft takes off on a path clear of the arrival protection area, how is the "arrival protection area" defined?',
    options: [
      { text: 'The shaded area extending from a line 30° from the IAF to a line 30° from the outermost edge of the approach procedure', isCorrect: false },
      { text: 'The shaded area extending from a line 45° from an established compulsory reporting waypoint to a line 45° from the outermost edge of the remainder of the arrival/approach procedure', isCorrect: true },
      { text: 'A 5 NM wide corridor on either side of the final approach track up to 15 NM from the threshold', isCorrect: false },
      { text: 'A 60° sector behind the Final Approach Fix (FAF)', isCorrect: false }
    ],
    explanation: 'The Note to Sec. 4.7.1.3 defines the arrival protection area as the shaded area extending from a line 45 degrees from an established compulsory reporting waypoint to a line 45 degrees from the outermost edge of the remainder of the arrival and/or approach procedure.'
  },
  {
    id: 'MATS-V2-019',
    volume: 'Volume II',
    category: 'Sec. 4.8 Time-Based Wake Turbulence',
    reference: 'MATS Part 3 Vol. II, 4.8.3.3',
    difficulty: 'Hard',
    question: 'What minimum time-based wake turbulence separation shall be applied for a MEDIUM aircraft taking off from an intermediate part of the same runway behind a SUPER aircraft taking off from the full-length threshold?',
    options: [
      { text: '2 minutes', isCorrect: false },
      { text: '3 minutes', isCorrect: false },
      { text: '4 minutes', isCorrect: true },
      { text: '5 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 4.8.3.3 b) requires a minimum separation of 4 minutes for a LIGHT or MEDIUM aircraft taking off from an intermediate part of the same runway (or parallel runway separated by < 760 m) behind a SUPER aircraft.'
  },
  {
    id: 'MATS-V2-020',
    volume: 'Volume II',
    category: 'Sec. 4.9 Own Separation in VMC',
    reference: 'MATS Part 3 Vol. II, 4.9.1',
    difficulty: 'Medium',
    question: 'A clearance for a controlled IFR flight to fly maintaining its own separation while in Visual Meteorological Conditions (VMC) may only be issued in which airspace classes and vertical limits?',
    options: [
      { text: 'Class A and B airspace at all flight levels', isCorrect: false },
      { text: 'Class D and E airspace below 3 050 m (10 000 ft) during climb or descent upon pilot request', isCorrect: true },
      { text: 'Within an Aerodrome Traffic Zone (ATZ) below 3 000 ft only', isCorrect: false },
      { text: 'In all airspace classes whenever flight visibility exceeds 8 km', isCorrect: false }
    ],
    explanation: 'Sec. 4.9.1 restricts clearances to maintain own separation in VMC to controlled flights in Class D and E airspace below 3 050 m (10 000 ft) during climb or descent.'
  },

  // -------------------- VOLUME III --------------------
  {
    id: 'MATS-V3-001',
    volume: 'Volume III',
    category: 'Sec. 5.3 Standard Departure Clearances',
    reference: 'MATS Part 3 Vol. III, 5.3.2.3',
    difficulty: 'Easy',
    question: 'Which mandatory items shall be contained in a standard clearance for a departing aircraft assigned a Standard Instrument Departure (SID)?',
    options: [
      { text: 'Aircraft identification, clearance limit, assigned SID designator, cleared level, allocated SSR code, and any other necessary instructions', isCorrect: true },
      { text: 'Aircraft identification, runway-in-use, and surface wind direction only', isCorrect: false },
      { text: 'Aircraft identification, aerodrome QFE, and estimated time of arrival (ETA)', isCorrect: false },
      { text: 'STAR designator, approach transition, and ATIS broadcast code', isCorrect: false }
    ],
    explanation: 'Sec. 5.3.2.3 requires standard departure clearances to include: aircraft identification, clearance limit, SID designator, cleared level, allocated SSR code, and any other required instructions (such as next frequency).'
  },
  {
    id: 'MATS-V3-002',
    volume: 'Volume III',
    category: 'Sec. 5.5 Expected Approach Time (EAT)',
    reference: 'MATS Part 3 Vol. III, 5.5.4.1',
    difficulty: 'Medium',
    question: 'An Expected Approach Time (EAT) shall be determined and transmitted to an arriving aircraft as soon as practicable whenever it is anticipated that the aircraft will be delayed for:',
    options: [
      { text: '5 minutes or more', isCorrect: false },
      { text: '10 minutes or more', isCorrect: true },
      { text: '15 minutes or more', isCorrect: false },
      { text: '20 minutes or more', isCorrect: false }
    ],
    explanation: 'Under Sec. 5.5.4, an EAT is determined and transmitted to an arriving aircraft whenever an approach delay of 10 minutes or more is anticipated (and revised if it changes by 5 minutes or more).'
  },
  {
    id: 'MATS-V3-003',
    volume: 'Volume III',
    category: 'Sec. 5.5 Holding Priority',
    reference: 'MATS Part 3 Vol. III, 5.5.5.7 & 5.5.5.8',
    difficulty: 'Medium',
    question: 'While the first aircraft to arrive over a holding fix is normally assigned the lowest level, what procedure is recommended for turbojet aircraft when extended holding is anticipated?',
    options: [
      { text: 'Keep turbojet aircraft at the lowest level below turboprop traffic to preserve sequence', isCorrect: false },
      { text: 'Permit turbojet aircraft, when practicable, to hold at higher levels to conserve fuel while retaining their order in the approach sequence', isCorrect: true },
      { text: 'Instruct turbojet aircraft to leave the holding fix and orbit 30 NM away from the aerodrome', isCorrect: false },
      { text: 'Grant turbojet aircraft emergency landing priority ahead of medical flights', isCorrect: false }
    ],
    explanation: 'Sec. 5.5.5.8 recommends permitting turbojet aircraft, when practicable during extended holding, to hold at higher levels to conserve fuel while retaining their order in the approach sequence.'
  },
  {
    id: 'MATS-V3-004',
    volume: 'Volume III',
    category: 'Sec. 5.7 Independent Parallel Departures',
    reference: 'MATS Part 3 Vol. III, 5.7.2.2',
    difficulty: 'Medium',
    question: 'For independent parallel IFR departures using RNAV or RNP instrument departure procedures with runway centre lines spaced at least 760 m (2 500 ft) apart, what minimum nominal track divergence is permitted?',
    options: [
      { text: '10 degrees, provided the turn commences no more than 2.0 NM (3.7 km) from the departure end of the runway', isCorrect: true },
      { text: '15 degrees, provided the turn commences no more than 3.0 NM from the departure end of the runway', isCorrect: false },
      { text: '5 degrees immediately after passing 400 ft AGL', isCorrect: false },
      { text: '10 degrees, provided the turn commences after passing 1 000 ft AGL', isCorrect: false }
    ],
    explanation: 'Sec. 5.7.2.2 b) 2) allows a 10-degree track divergence (reduced from 15 degrees) where both aircraft fly RNAV/RNP departures and the turn commences no more than 3.7 km (2.0 NM) from the departure end of the runway.'
  },
  {
    id: 'MATS-V3-005',
    volume: 'Volume III',
    category: 'Sec. 5.7 Independent Parallel Approaches',
    reference: 'MATS Part 3 Vol. III, 5.7.3.2.4',
    difficulty: 'Hard',
    question: 'When vectoring an aircraft to intercept the final approach course or track during independent parallel approaches, the final vector shall meet all of the following conditions, EXCEPT:',
    options: [
      { text: 'Enable the aircraft to intercept at an angle not greater than 30 degrees', isCorrect: false },
      { text: 'Provide at least 1.0 NM (1.9 km) straight and level flight prior to final approach course intercept', isCorrect: false },
      { text: 'Enable the aircraft to be established on the final approach course in level flight for at least 2.0 NM (3.7 km) prior to glide path intercept', isCorrect: false },
      { text: 'Enable the aircraft to intercept at an angle up to 45 degrees with 1.5 NM level flight before glide path intercept', isCorrect: true }
    ],
    explanation: 'Sec. 5.7.3.2.4 mandates an intercept angle ≤ 30°, at least 1.9 km (1.0 NM) straight and level flight before localizer/track intercept, and at least 3.7 km (2.0 NM) level flight on the final approach course before glide path intercept.'
  },
  {
    id: 'MATS-V3-006',
    volume: 'Volume III',
    category: 'Sec. 5.7 No-Transgression Zone (NTZ)',
    reference: 'MATS Part 3 Vol. III, 5.7.3.1',
    difficulty: 'Hard',
    question: 'In simultaneous independent parallel approach operations, what is the minimum width of the No-Transgression Zone (NTZ) established between the two Normal Operating Zones (NOZs)?',
    options: [
      { text: '300 m (1 000 ft)', isCorrect: false },
      { text: '610 m (2 000 ft)', isCorrect: true },
      { text: '760 m (2 500 ft)', isCorrect: false },
      { text: '915 m (3 000 ft)', isCorrect: false }
    ],
    explanation: 'For independent parallel approaches (Sec. 5.7.3), the No-Transgression Zone (NTZ) is a corridor of at least 610 m (2 000 ft) width monitored by dedicated controllers to prevent lateral penetration.'
  },
  {
    id: 'MATS-V3-007',
    volume: 'Volume III',
    category: 'Sec. 6.1 Tower Alerting Service',
    reference: 'MATS Part 3 Vol. III, 6.1.2.3',
    difficulty: 'Easy',
    question: 'An aircraft that fails to report after transfer to an aerodrome control tower, or ceases radio contact after reporting, and fails to land within how many minutes after the expected landing time shall be reported to APP, ACC, FIC, or RCC?',
    options: [
      { text: '3 minutes', isCorrect: false },
      { text: '5 minutes', isCorrect: true },
      { text: '10 minutes', isCorrect: false },
      { text: '15 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 6.1.2.3 requires aerodrome control towers to report such aircraft to the approach control unit, ACC, FIC, or RCC/RSC if it fails to land within 5 minutes after the expected landing time.'
  },
  {
    id: 'MATS-V3-008',
    volume: 'Volume III',
    category: 'Sec. 6.2 Noise Abatement Runway',
    reference: 'MATS Part 3 Vol. III, 6.2.6',
    difficulty: 'Medium',
    question: 'Under which meteorological conditions shall noise abatement NOT be a determining factor in runway-in-use nomination for landing operations?',
    options: [
      { text: 'Ceiling lower than 1 000 ft or visibility less than 5 000 m', isCorrect: false },
      { text: 'Ceiling lower than 500 ft (150 m) above aerodrome elevation or visibility less than 1 900 m', isCorrect: true },
      { text: 'Tailwind component exceeding 3 kt on a dry runway', isCorrect: false },
      { text: 'When only a VOR/DME non-precision approach is available with 3 000 m visibility', isCorrect: false }
    ],
    explanation: 'Sec. 6.2.6 b) 1) prohibits using noise abatement as a determining factor for landing when the ceiling is lower than 150 m (500 ft) above aerodrome elevation or visibility is less than 1 900 m (or if the runway is contaminated).'
  },
  {
    id: 'MATS-V3-009',
    volume: 'Volume III',
    category: 'Sec. 6.4 Aerodrome Information Order',
    reference: 'MATS Part 3 Vol. III, 6.4.1.2.3',
    difficulty: 'Easy',
    question: 'Prior to entering the traffic circuit or commencing an approach to land, in what specific order shall the aerodrome controller provide essential landing information to the aircraft?',
    options: [
      { text: 'QNH altimeter setting, air temperature, then runway-in-use', isCorrect: false },
      { text: 'Runway to be used, surface wind direction and speed (including significant variations), then QNH altimeter setting (and QFE if requested/applicable)', isCorrect: true },
      { text: 'Landing Distance Available (LDA), aerodrome elevation, then approach lighting status', isCorrect: false },
      { text: 'Parking stand assignment, ground control frequency, then apron surface conditions', isCorrect: false }
    ],
    explanation: 'Sec. 6.4.1.2.3 mandates providing elements in the exact order: (a) runway to be used, (b) surface wind direction and speed, and (c) QNH altimeter setting (and QFE on a regular basis or if requested).'
  },
  {
    id: 'MATS-V3-010',
    volume: 'Volume III',
    category: 'Sec. 6.6 Runway-Holding Position',
    reference: 'MATS Part 3 Vol. III, 6.6.3.1.3.2',
    difficulty: 'Medium',
    question: 'When is a controller permitted to clear an aircraft to line up and hold on the approach end of a runway-in-use while another aircraft is effecting a landing on that same runway?',
    options: [
      { text: 'Immediately after the landing aircraft crosses the runway threshold', isCorrect: false },
      { text: 'Not until the landing aircraft has passed the point of intended holding', isCorrect: true },
      { text: 'Whenever the landing aircraft is still more than 1 NM from the runway threshold', isCorrect: false },
      { text: 'During daylight hours whenever ground visibility exceeds 5 km', isCorrect: false }
    ],
    explanation: 'Sec. 6.6.3.1.3.2 states that the controller shall not permit aircraft to line up and hold on the approach end of a runway-in-use whenever another aircraft is effecting a landing, until the landing aircraft has passed the point of intended holding.'
  },
  {
    id: 'MATS-V3-011',
    volume: 'Volume III',
    category: 'Sec. 6.7 Traffic Circuit Positions',
    reference: 'MATS Part 3 Vol. III, 6.7.2',
    difficulty: 'Easy',
    question: 'In a standard aerodrome traffic circuit, what is the name of the leg flown parallel to the runway-in-use in the direction opposite to landing?',
    options: [
      { text: 'Crosswind leg', isCorrect: false },
      { text: 'Downwind leg', isCorrect: true },
      { text: 'Base leg', isCorrect: false },
      { text: 'Upwind leg', isCorrect: false }
    ],
    explanation: 'Standard aerodrome traffic circuit legs consist of: Upwind (take-off), Crosswind, Downwind (parallel to the runway opposite the landing direction), Base leg, and Final approach.'
  },
  {
    id: 'MATS-V3-012',
    volume: 'Volume III',
    category: 'Sec. 6.7 Landing Priority Order',
    reference: 'MATS Part 3 Vol. III, 6.7.3.3',
    difficulty: 'Medium',
    question: 'Which category of flight shall be afforded the highest landing priority by an aerodrome control tower?',
    options: [
      { text: 'Scheduled state/VVIP flights', isCorrect: false },
      { text: 'An aircraft that anticipates being compelled to land because of factors affecting safe operation (e.g., engine failure, shortage of fuel)', isCorrect: true },
      { text: 'Delayed wide-body commercial airliners (SUPER/HEAVY)', isCorrect: false },
      { text: 'Training flights approaching the end of their scheduled slot', isCorrect: false }
    ],
    explanation: 'Sec. 6.7.3.3 establishes landing priority order: (a) aircraft compelled to land due to safety factors (engine failure, fuel shortage), (b) hospital/medical flights, (c) search and rescue flights, and (d) other flights designated by the authority.'
  },
  {
    id: 'MATS-V3-013',
    volume: 'Volume III',
    category: 'Sec. 6.9 Radiotelephony TAKE-OFF',
    reference: 'MATS Part 3 Vol. III, 6.9.3.3',
    difficulty: 'Easy',
    question: 'Under what specific circumstances shall the expression "TAKE-OFF" be used in radiotelephony communications?',
    options: [
      { text: 'When instructing an aircraft to line up and wait on the runway', isCorrect: false },
      { text: 'Only when an aircraft is cleared for take-off or when cancelling a take-off clearance', isCorrect: true },
      { text: 'When querying departure readiness at the runway-holding position', isCorrect: false },
      { text: 'Whenever referencing runway departure procedures or surface wind checks', isCorrect: false }
    ],
    explanation: 'Sec. 6.9.3.3 mandates that the expression TAKE-OFF shall only be used in radiotelephony when an aircraft is cleared for take-off or when cancelling a take-off clearance (the word "departure" is used in other contexts).'
  },
  {
    id: 'MATS-V3-014',
    volume: 'Volume III',
    category: 'Sec. 6.10 Landing Roll-Out Restriction',
    reference: 'MATS Part 3 Vol. III, 6.10.3.2',
    difficulty: 'Medium',
    question: 'Which landing or roll-out manoeuvre shall NOT be requested by an aerodrome controller for a SUPER or HEAVY wake turbulence category aircraft?',
    options: [
      { text: 'Vacating the runway at a specified exit taxiway', isCorrect: false },
      { text: 'Landing beyond the touchdown zone of the runway', isCorrect: true },
      { text: 'Reporting when the entire aircraft is beyond the runway-holding position', isCorrect: false },
      { text: 'Expediting vacating the runway after landing roll-out', isCorrect: false }
    ],
    explanation: 'Sec. 6.10.3.2 explicitly prohibits requesting a SUPER or HEAVY aircraft to land beyond the touchdown zone of a runway.'
  },
  {
    id: 'MATS-V3-015',
    volume: 'Volume III',
    category: 'Sec. 6.11 Reduced Runway Separation Minima',
    reference: 'MATS Part 3 Vol. III, 6.11.3 & 6.11.6',
    difficulty: 'Hard',
    question: 'Reduced Runway Separation Minima (RRSM) between aircraft using the same runway may only be applied when all of the following conditions are met, EXCEPT:',
    options: [
      { text: 'Applied during daylight hours from 30 minutes after local sunrise to 30 minutes before local sunset', isCorrect: false },
      { text: 'Visibility is at least 5 km, ceiling is not lower than 300 m (1 000 ft), and tailwind component does not exceed 5 kt', isCorrect: false },
      { text: 'Applied between a departing aircraft and a preceding landing aircraft', isCorrect: true },
      { text: 'Wake turbulence separation minima are applied and braking action is not adversely affected by contaminants', isCorrect: false }
    ],
    explanation: 'Sec. 6.11.5 explicitly states that Reduced Runway Separation Minima shall NOT apply between a departing aircraft and a preceding landing aircraft.'
  },
  {
    id: 'MATS-V3-016',
    volume: 'Volume III',
    category: 'Sec. 6.11 RRSM Category Distances',
    reference: 'MATS Part 3 Vol. III, 6.11.7 a) 2)',
    difficulty: 'Hard',
    question: 'Under Reduced Runway Separation Minima (RRSM), a succeeding landing Category 2 aircraft may cross the runway threshold when a preceding landing Category 1 aircraft has passed a point at least how far from the runway threshold?',
    options: [
      { text: '600 m from the threshold, in motion and vacating without backtracking', isCorrect: false },
      { text: '1 500 m from the threshold, in motion and vacating without backtracking', isCorrect: true },
      { text: '2 400 m from the threshold and beyond the runway-holding position', isCorrect: false },
      { text: '1 000 m from the threshold with a tailwind component not exceeding 10 kt', isCorrect: false }
    ],
    explanation: 'Sec. 6.11.7 a) 2) specifies a minimum distance of 1 500 m from the runway threshold for a succeeding landing Category 2 aircraft behind a Category 1 or 2 aircraft (600 m applies for Cat 1 behind Cat 1/2, and 2 400 m behind Cat 3).'
  },
  {
    id: 'MATS-V3-017',
    volume: 'Volume III',
    category: 'Sec. 6.14 Suspension of VFR Operations',
    reference: 'MATS Part 3 Vol. III, 6.14.1',
    difficulty: 'Medium',
    question: 'Which ATS units are authorized to suspend any or all Visual Flight Rules (VFR) operations on or in the vicinity of an aerodrome when required by safety considerations?',
    options: [
      { text: 'Only the Airport Authority upon written approval from the DGCA', isCorrect: false },
      { text: 'The approach control unit serving the aerodrome or the aerodrome control tower concerned', isCorrect: true },
      { text: 'Only the pilot-in-command of the first aircraft reporting adverse weather', isCorrect: false },
      { text: 'The aerodrome meteorological office independently without ATS coordination', isCorrect: false }
    ],
    explanation: 'Sec. 6.14.1 empowers either the approach control unit serving the aerodrome or the aerodrome control tower concerned to suspend VFR operations on or in the vicinity of the aerodrome.'
  },
  {
    id: 'MATS-V3-018',
    volume: 'Volume III',
    category: 'Sec. 6.15 Special VFR Authorization',
    reference: 'MATS Part 3 Vol. III, 6.15.2',
    difficulty: 'Hard',
    question: 'When authorizing a Special VFR flight within a Control Zone (CTR), what is the minimum reported ground visibility required?',
    options: [
      { text: 'Not less than 800 m', isCorrect: false },
      { text: 'Not less than 1 500 m', isCorrect: true },
      { text: 'Not less than 3 000 m', isCorrect: false },
      { text: 'Not less than 5 000 m', isCorrect: false }
    ],
    explanation: 'Sec. 6.15.2 stipulates that a Special VFR flight shall not be authorized when the ground visibility is less than 1 500 m (except for helicopters under specific national provisions).'
  },

  // -------------------- VOLUME IV --------------------
  {
    id: 'MATS-V4-001',
    volume: 'Volume IV',
    category: 'Sec. 7.1 ATS Surveillance Systems',
    reference: 'MATS Part 3 Vol. IV, 7.1.11',
    difficulty: 'Medium',
    question: 'ADS-B may be used alone, including in the provision of separation between aircraft, provided all of the following requirements are met, EXCEPT:',
    options: [
      { text: 'Identification of ADS-B-equipped aircraft is established and maintained', isCorrect: false },
      { text: 'The data integrity measure in the ADS-B message is adequate to support the separation minimum', isCorrect: false },
      { text: 'There is no requirement for detection of aircraft not transmitting ADS-B', isCorrect: false },
      { text: 'The aircraft is operating outside two-way VHF radiocommunication coverage', isCorrect: true }
    ],
    explanation: 'Sec. 7.1.11 sets four conditions for standalone ADS-B separation: maintained identification, adequate data integrity measure, no requirement to detect non-ADS-B aircraft, and no requirement for independent position determination.'
  },
  {
    id: 'MATS-V4-002',
    volume: 'Volume IV',
    category: 'Sec. 7.5 Pressure-Altitude Verification',
    reference: 'MATS Part 3 Vol. IV, 7.5.5.1.1',
    difficulty: 'Easy',
    question: 'What is the tolerance value used to determine that pressure-altitude-derived level information (Mode C / Mode S / ADS-B) displayed to the controller is accurate within RVSM airspace?',
    options: [
      { text: '±30 m (±100 ft)', isCorrect: false },
      { text: '±60 m (±200 ft)', isCorrect: true },
      { text: '±90 m (±300 ft)', isCorrect: false },
      { text: '±150 m (±500 ft)', isCorrect: false }
    ],
    explanation: 'Sec. 7.5.5.1.1 specifies a tolerance value of ±60 m (±200 ft) in RVSM airspace (and ±90 m / ±300 ft in non-RVSM airspace).'
  },
  {
    id: 'MATS-V4-003',
    volume: 'Volume IV',
    category: 'Sec. 7.5 Level Vacated Determination',
    reference: 'MATS Part 3 Vol. IV, 7.5.5.2.3',
    difficulty: 'Medium',
    question: 'Based on verified pressure-altitude-derived level information on a situation display, a climbing or descending aircraft is considered to have vacated a level once the displayed level indicates a change of more than how many feet in the anticipated direction?',
    options: [
      { text: 'More than 100 ft (30 m)', isCorrect: false },
      { text: 'More than 200 ft (60 m)', isCorrect: false },
      { text: 'More than 300 ft (90 m)', isCorrect: true },
      { text: 'More than 500 ft (150 m)', isCorrect: false }
    ],
    explanation: 'Sec. 7.5.5.2.3 specifies that an aircraft is considered to have vacated a level when verified pressure-altitude information indicates a change of more than 90 m (300 ft) in the anticipated direction.'
  },
  {
    id: 'MATS-V4-004',
    volume: 'Volume IV',
    category: 'Sec. 7.6 PSR Identification Method',
    reference: 'MATS Part 3 Vol. IV, 7.6.2.4.1',
    difficulty: 'Medium',
    question: 'When identifying an aircraft using Primary Surveillance Radar (PSR) by instructing a heading change, what minimum turn angle shall be prescribed to correlate the radar position indication?',
    options: [
      { text: '15 degrees or more', isCorrect: false },
      { text: '20 degrees or more', isCorrect: false },
      { text: '30 degrees or more', isCorrect: true },
      { text: '45 degrees or more', isCorrect: false }
    ],
    explanation: 'Sec. 7.6.2.4.1 d) requires instructing the pilot to execute one or more heading changes of 30 degrees or more (and direction-finding bearings shall not be used as the sole means of identification).'
  },
  {
    id: 'MATS-V4-005',
    volume: 'Volume IV',
    category: 'Sec. 7.6 Vectoring & Minimum Vectoring Altitude',
    reference: 'MATS Part 3 Vol. IV, 7.6.5.2 & 7.6.8.2',
    difficulty: 'Medium',
    question: 'When vectoring an IFR flight or assigning a direct routing that takes the aircraft off an ATS route, what is the controller’s responsibility regarding terrain and obstacle clearance?',
    options: [
      { text: 'Obstacle clearance remains solely the pilot’s responsibility at all times', isCorrect: false },
      { text: 'The controller shall issue clearances such that the prescribed obstacle clearance (Minimum Vectoring Altitude / SMAC) exists at all times until the aircraft resumes own navigation', isCorrect: true },
      { text: 'Vectoring off ATS routes is permitted only during daylight VMC', isCorrect: false },
      { text: 'The controller may descend the aircraft to 500 ft AGL for visual terrain reference', isCorrect: false }
    ],
    explanation: 'Sec. 7.6.5.2 and 7.6.8.2 mandate that controllers maintain prescribed minimum altitudes (Surveillance Minimum Altitude Chart / SMAC) at all times during tactical vectoring until the aircraft resumes own navigation on a published route/procedure.'
  },
  {
    id: 'MATS-V4-006',
    volume: 'Volume IV',
    category: 'Sec. 7.7 Surveillance Separation Minimum',
    reference: 'MATS Part 3 Vol. IV, 7.7.3.1',
    difficulty: 'Easy',
    question: 'Unless otherwise prescribed based on specific sensor capabilities or parallel approach procedures, what is the standard horizontal separation minimum based on radar, ADS-B, and/or MLAT systems?',
    options: [
      { text: '5.6 km (3.0 NM)', isCorrect: false },
      { text: '9.3 km (5.0 NM)', isCorrect: true },
      { text: '18.5 km (10.0 NM)', isCorrect: false },
      { text: '4.6 km (2.5 NM)', isCorrect: false }
    ],
    explanation: 'Sec. 7.7.3.1 establishes a standard horizontal separation minimum of 9.3 km (5.0 NM) based on radar, ADS-B, and/or MLAT systems.'
  },
  {
    id: 'MATS-V4-007',
    volume: 'Volume IV',
    category: 'Sec. 7.7 Reduced Final Approach Separation (2.5 NM)',
    reference: 'MATS Part 3 Vol. IV, 7.7.3.2 b)',
    difficulty: 'Hard',
    question: 'A reduced surveillance separation minimum of 4.6 km (2.5 NM) between succeeding aircraft on the same final approach track within 10 NM of the runway threshold requires that the average Runway Occupancy Time (ROT) does not exceed:',
    options: [
      { text: '40 seconds with an update rate of 4 seconds or less', isCorrect: false },
      { text: '50 seconds with an update rate of 5 seconds or less', isCorrect: true },
      { text: '60 seconds with an update rate of 5 seconds or less', isCorrect: false },
      { text: '45 seconds with an update rate of 3 seconds or less', isCorrect: false }
    ],
    explanation: 'Sec. 7.7.3.2 b) i) & iii) require proven average ROT not exceeding 50 seconds, a surveillance update rate of 5 seconds or less, good braking action, and no distance-based wake turbulence separation applicability.'
  },
  {
    id: 'MATS-V4-008',
    volume: 'Volume IV',
    category: 'Sec. 7.7 Measurement on Situation Display',
    reference: 'MATS Part 3 Vol. IV, 7.7.2.4 & 7.7.2.6',
    difficulty: 'Hard',
    question: 'How shall separation distance be measured on a situation display when separating an aircraft represented by a PSR blip from another aircraft represented by an SSR response?',
    options: [
      { text: 'From the centre of the PSR blip to the centre of the SSR response', isCorrect: false },
      { text: 'From the nearest edge of the PSR blip to the nearest edge of the SSR response', isCorrect: false },
      { text: 'From the centre of the PSR blip to the nearest edge of the SSR response', isCorrect: true },
      { text: 'From the furthest edge of the PSR blip to the centre of the SSR response', isCorrect: false }
    ],
    explanation: 'Sec. 7.7.2.4 prescribes measuring from the centre of the PSR blip to the nearest edge of the SSR response (whereas separation between two SSR responses is measured between their closest edges per Sec. 7.7.2.6).'
  },
  {
    id: 'MATS-V4-009',
    volume: 'Volume IV',
    category: 'Sec. 7.7 Distance-Based Wake Turbulence',
    reference: 'MATS Part 3 Vol. IV, 7.7.3.4',
    difficulty: 'Hard',
    question: 'In ATS surveillance service during the approach and departure phases, what is the minimum distance-based wake turbulence separation for a LIGHT aircraft operating directly behind a HEAVY aircraft at the same altitude or less than 1 000 ft below?',
    options: [
      { text: '7.4 km (4 NM)', isCorrect: false },
      { text: '9.3 km (5 NM)', isCorrect: false },
      { text: '11.1 km (6 NM)', isCorrect: true },
      { text: '14.8 km (8 NM)', isCorrect: false }
    ],
    explanation: 'Under distance-based wake turbulence separation minima (Sec. 7.7.3.4): LIGHT behind SUPER = 8 NM; LIGHT behind HEAVY = 6 NM; MEDIUM behind HEAVY = 5 NM; LIGHT behind MEDIUM = 5 NM.'
  },
  {
    id: 'MATS-V4-010',
    volume: 'Volume IV',
    category: 'Sec. 7.8 General ADS-B Emergency Alert',
    reference: 'MATS Part 3 Vol. IV, 7.8.1.3',
    difficulty: 'Medium',
    question: 'Whenever a general ADS-B emergency alert is observed on the situation display with no indication of the specific nature of the emergency and no radio response is received, what action shall the controller take?',
    options: [
      { text: 'Suppress the alert label immediately assuming an avionics malfunction', isCorrect: false },
      { text: 'Attempt to ascertain if the aircraft can receive ATC transmissions by requesting it to execute a specified manoeuvre observable on the situation display', isCorrect: true },
      { text: 'Wait 30 minutes before notifying adjacent sectors or rescue units', isCorrect: false },
      { text: 'Suspend surveillance separation for all other traffic within the sector', isCorrect: false }
    ],
    explanation: 'Sec. 7.8.1.3 b) directs the controller to ascertain whether the aircraft can receive ATC transmissions by requesting it to execute a specified manoeuvre observable on the situation display.'
  },
  {
    id: 'MATS-V4-011',
    volume: 'Volume IV',
    category: 'Sec. 7.9 Final Approach Vector Intercept Angle',
    reference: 'MATS Part 3 Vol. IV, 7.9.3.6',
    difficulty: 'Easy',
    question: 'When vectoring an aircraft for a standard single-runway instrument approach, the final vector shall provide an intercept angle with the final approach track of:',
    options: [
      { text: '30 degrees or less', isCorrect: false },
      { text: '45 degrees or less', isCorrect: true },
      { text: '60 degrees or less', isCorrect: false },
      { text: '90 degrees or less', isCorrect: false }
    ],
    explanation: 'Sec. 7.9.3.6 states that the final vector for a standard instrument approach shall enable the aircraft to be established on the final approach track prior to glide path intercept with an intercept angle of 45 degrees or less (30° applies to independent parallel approaches).'
  },
  {
    id: 'MATS-V4-012',
    volume: 'Volume IV',
    category: 'Sec. 7.11 Special VFR Vectoring Prohibition',
    reference: 'MATS Part 3 Vol. IV, 7.11.1.2',
    difficulty: 'Medium',
    question: 'What is the operational rule regarding the vectoring of Special VFR flights using ATS surveillance systems?',
    options: [
      { text: 'Special VFR flights may be vectored routinely to expedite aerodrome traffic flow', isCorrect: false },
      { text: 'Special VFR flights shall not be vectored unless special circumstances, such as emergencies, dictate otherwise', isCorrect: true },
      { text: 'Special VFR flights shall always be vectored during night operations', isCorrect: false },
      { text: 'Special VFR flights may only be vectored by an ACC above FL 100', isCorrect: false }
    ],
    explanation: 'Sec. 7.11.1.2 states unequivocally: "Special VFR flights shall not be vectored unless special circumstances, such as emergencies, dictate otherwise."'
  },
  {
    id: 'MATS-V4-013',
    volume: 'Volume IV',
    category: 'Sec. 8.1 Air Traffic Advisory Service',
    reference: 'MATS Part 3 Vol. IV, 8.1.4.1.3',
    difficulty: 'Medium',
    question: 'When providing Air Traffic Advisory Service in Class F advisory airspace or on advisory routes, how shall a proposed course of action be phrased to an aircraft?',
    options: [
      { text: 'By issuing a mandatory ATC clearance to prevent collisions', isCorrect: false },
      { text: 'By delivering advisory information only, using the words "advise" or "suggest" rather than issuing clearances', isCorrect: true },
      { text: 'By issuing compulsory radar vectors to separate IFR and VFR traffic', isCorrect: false },
      { text: 'By transmitting meteorological warnings without any traffic avoidance advice', isCorrect: false }
    ],
    explanation: 'Sec. 8.1.4.1.3 clarifies that Air Traffic Advisory Service does not deliver "clearances" but only "advisory information" and uses the words "advise" or "suggest" when proposing a course of action.'
  },
  {
    id: 'MATS-V4-014',
    volume: 'Volume IV',
    category: 'Sec. 8.1 SIGMET Transmission Period',
    reference: 'MATS Part 3 Vol. IV, 8.1.3.2',
    difficulty: 'Hard',
    question: 'SIGMET and AIRMET information transmitted by an ATS unit to aircraft in flight shall cover a portion of the route up to how many hours’ flying time ahead of the aircraft?',
    options: [
      { text: '1 hour’s flying time ahead (60 minutes)', isCorrect: false },
      { text: '2 hours’ flying time ahead', isCorrect: true },
      { text: '4 hours’ flying time ahead', isCorrect: false },
      { text: 'The entire remaining route to the destination aerodrome', isCorrect: false }
    ],
    explanation: 'Pursuant to Flight Information Service rules (Sec. 8.1.3 / ICAO Doc 4444), transmitted SIGMET/AIRMET information shall cover a portion of the route up to 2 hours’ flying time ahead of the aircraft.'
  },
  {
    id: 'MATS-V4-015',
    volume: 'Volume IV',
    category: 'Sec. 8.2 Alerting Service Phases',
    reference: 'MATS Part 3 Vol. IV, 8.2.2.1',
    difficulty: 'Easy',
    question: 'When no report from an aircraft has been received within a reasonable period after a scheduled or expected reporting time, within what stipulated period shall the ATS unit endeavour to obtain such report before declaring the "Uncertainty Phase" (INCERFA)?',
    options: [
      { text: '10 minutes', isCorrect: false },
      { text: '15 minutes', isCorrect: false },
      { text: '30 minutes', isCorrect: true },
      { text: '60 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 8.2.2.1 stipulates a period of 30 minutes following a scheduled or expected reporting time within which the ATS unit shall endeavour to obtain a report in order to apply Uncertainty Phase (INCERFA) provisions.'
  },
  {
    id: 'MATS-V4-016',
    volume: 'Volume IV',
    category: 'Sec. 9.1 Transfer of Communication Timing',
    reference: 'MATS Part 3 Vol. IV, 9.1.2.4',
    difficulty: 'Medium',
    question: 'Unless otherwise agreed between two adjacent ACCs, how many minutes prior to the estimated time over the common FIR/CTA boundary shall transfer of radiocommunications be effected?',
    options: [
      { text: '2 minutes prior', isCorrect: false },
      { text: '5 minutes prior', isCorrect: true },
      { text: '10 minutes prior', isCorrect: false },
      { text: '15 minutes prior', isCorrect: false }
    ],
    explanation: 'Under ATS coordination procedures (Sec. 9.1), transfer of communications between adjacent ACCs is normally effected 5 minutes before the aircraft is estimated to cross the common control area boundary.'
  },
  {
    id: 'MATS-V4-017',
    volume: 'Volume IV',
    category: 'Sec. 9.1 Coordination Estimate Revision',
    reference: 'MATS Part 3 Vol. IV, 9.1.2.2',
    difficulty: 'Hard',
    question: 'When a previously coordinated boundary estimate changes significantly, what minimum time variation requires the transferring ATS unit to immediately notify the accepting ATS unit of the revised estimate?',
    options: [
      { text: '1 minute or more', isCorrect: false },
      { text: '3 minutes or more', isCorrect: true },
      { text: '5 minutes or more', isCorrect: false },
      { text: '10 minutes or more', isCorrect: false }
    ],
    explanation: 'In accordance with ATS coordination requirements (Sec. 9.1), any revision to a previously coordinated boundary estimate of 3 minutes or more shall be notified immediately to the accepting unit.'
  },

  // -------------------- VOLUME V --------------------
  {
    id: 'MATS-V5-001',
    volume: 'Volume V',
    category: 'Sec. 10.1 AFTN Message Priorities',
    reference: 'MATS Part 3 Vol. V, 10.1.2',
    difficulty: 'Easy',
    question: 'When transmitted via the Aeronautical Fixed Telecommunication Network (AFTN), which Priority Indicator is assigned to urgency messages, including messages relating to an alert phase or uncertainty phase?',
    options: [
      { text: 'SS', isCorrect: false },
      { text: 'DD', isCorrect: true },
      { text: 'FF', isCorrect: false },
      { text: 'GG', isCorrect: false }
    ],
    explanation: 'Sec. 10.1.2 assigns Priority Indicator SS to distress messages, DD to urgency messages (including alert and uncertainty phases), and FF (or higher) to radiocommunication failure/other emergency messages.'
  },
  {
    id: 'MATS-V5-002',
    volume: 'Volume V',
    category: 'Sec. 10.4 Radiocommunication Failure (RCF) Message',
    reference: 'MATS Part 3 Vol. V, 10.4.1.3.2',
    difficulty: 'Hard',
    question: 'When an ATS unit is aware that an aircraft is experiencing radiocommunication failure, and the next ATS unit has not yet received basic flight plan data because it uses Current Flight Plan (CPL) coordination, which messages shall be transmitted to that next ATS unit?',
    options: [
      { text: 'An Alerting (ALR) message only', isCorrect: false },
      { text: 'Both a Radiocommunication Failure (RCF) message and a Current Flight Plan (CPL) message', isCorrect: true },
      { text: 'A Cancellation (CNL) message followed by a Departure (DEP) message', isCorrect: false },
      { text: 'An Estimate (EST) message with Priority Indicator GG only', isCorrect: false }
    ],
    explanation: 'Sec. 10.4.1.3.2 mandates that if the next ATS unit has not received basic flight plan data because it receives a CPL in the coordination procedure, both an RCF message and a CPL message shall be transmitted to it.'
  },
  {
    id: 'MATS-V5-003',
    volume: 'Volume V',
    category: 'Sec. 10.4 Coordinate Initial (AIDC)',
    reference: 'MATS Part 3 Vol. V, 10.4.2.5.4.2',
    difficulty: 'Medium',
    question: 'In ATS Interfacility Data Communications (AIDC), what is the operational purpose of a "Coordinate Initial" message?',
    options: [
      { text: 'An advisory notification that requires no operational response from the receiving unit', isCorrect: false },
      { text: 'A proposal for coordination of a flight that must include boundary estimate data and route information from prior to entry to the destination aerodrome', isCorrect: true },
      { text: 'Automatic cancellation of a flight plan if departure does not occur within 60 minutes', isCorrect: false },
      { text: 'Confirmation of aircraft arrival after landing at the destination aerodrome', isCorrect: false }
    ],
    explanation: 'Sec. 10.4.2.5.4.2 defines the Coordinate Initial message as a proposal for coordination of a flight, requiring the inclusion of boundary estimate data and relevant route data.'
  },
  {
    id: 'MATS-V5-004',
    volume: 'Volume V',
    category: 'Sec. 11.3 STAR Descent Phraseologies',
    reference: 'MATS Part 3 Vol. V, 11.3.1.2 ff) & kk)',
    difficulty: 'Medium',
    question: 'Which standard phraseology shall a controller use to clear an aircraft to descend to a specified level while cancelling both the published level and speed restrictions of a STAR?',
    options: [
      { text: 'DESCEND VIA STAR TO (level)', isCorrect: false },
      { text: 'DESCEND VIA STAR TO (level), CANCEL SPEED RESTRICTIONS', isCorrect: false },
      { text: 'DESCEND UNRESTRICTED TO (level) or DESCEND (level), CANCEL LEVEL AND SPEED RESTRICTIONS', isCorrect: true },
      { text: 'EXPEDITE DESCENT TO (level), DISREGARD STAR', isCorrect: false }
    ],
    explanation: 'Sec. 11.3.1.2 kk) prescribes "DESCEND UNRESTRICTED TO (level)" or "DESCEND (level), CANCEL LEVEL AND SPEED RESTRICTIONS" to cancel both level and speed restrictions on a STAR.'
  },
  {
    id: 'MATS-V5-005',
    volume: 'Volume V',
    category: 'Sec. 11.3 Stand By vs Monitor',
    reference: 'MATS Part 3 Vol. V, 11.3.1.4 Note',
    difficulty: 'Easy',
    question: 'What is the operational distinction between instructing an aircraft to "STAND BY" on a frequency versus instructing it to "MONITOR" a frequency?',
    options: [
      { text: '"STAND BY" is used when the ATS unit intends to initiate communications soon, whereas "MONITOR" is used when the pilot is simply required to listen out on the frequency', isCorrect: true },
      { text: '"STAND BY" instructs the pilot to switch off the VHF transmitter for 5 minutes, whereas "MONITOR" activates the SSR transponder', isCorrect: false },
      { text: 'Both terms carry identical operational meaning and are freely interchangeable', isCorrect: false },
      { text: '"MONITOR" is restricted exclusively to guard frequency 121.5 MHz during emergencies', isCorrect: false }
    ],
    explanation: 'The Note to Sec. 11.3.1.4 specifies that an aircraft is requested to "STAND BY" on a frequency when the ATS unit intends to initiate communications soon, and to "MONITOR" when listening out on a frequency.'
  },
  {
    id: 'MATS-V5-006',
    volume: 'Volume V',
    category: 'Sec. 11.4 Surveillance Transponder Phraseologies',
    reference: 'MATS Part 3 Vol. V, 11.4.3.8',
    difficulty: 'Easy',
    question: 'Which standard radiotelephony phraseology shall be used by a controller to request the temporary suspension of transponder operation?',
    options: [
      { text: 'STOP SQUAWK', isCorrect: false },
      { text: 'SQUAWK STANDBY', isCorrect: true },
      { text: 'SQUAWK LOW', isCorrect: false },
      { text: 'RESET SQUAWK', isCorrect: false }
    ],
    explanation: 'Sec. 11.4.3.8 designates the phraseology "SQUAWK STANDBY" to request temporary suspension of transponder operation.'
  },
  {
    id: 'MATS-V5-007',
    volume: 'Volume V',
    category: 'Sec. 12.4 ADS-C Ground System Shutdown',
    reference: 'MATS Part 3 Vol. V, 12.4.3.4.6.2.2',
    difficulty: 'Medium',
    question: 'In the event of an unplanned ADS-C ground system shutdown, the relevant ATS provider shall execute all of the following actions, EXCEPT:',
    options: [
      { text: 'Inform all affected aircraft and advise them of the requirement for position reports via voice or CPDLC', isCorrect: false },
      { text: 'Take necessary action to establish alternative separation, if required', isCorrect: false },
      { text: 'Inform adjacent ATS unit(s) by direct coordination and promulgate a NOTAM if appropriate', isCorrect: false },
      { text: 'Direct all en-route aircraft within the FIR to divert and land at the nearest aerodrome within 15 minutes', isCorrect: true }
    ],
    explanation: 'Sec. 12.4.3.4.6.2.2 requires informing affected aircraft to provide voice/CPDLC position reports, establishing alternative separation, directly coordinating with adjacent ATS units, and issuing a NOTAM if appropriate.'
  },
  {
    id: 'MATS-V5-008',
    volume: 'Volume V',
    category: 'Sec. 13.2 CPDLC Establishment & Rejection',
    reference: 'MATS Part 3 Vol. V, 13.2.3.2',
    difficulty: 'Hard',
    question: 'When an ATC unit-initiated request for CPDLC establishment is rejected by an airborne system, which CPDLC downlink message elements are permitted as the reason for rejection?',
    options: [
      { text: 'UNABLE DUE TO TRAFFIC or STANDBY', isCorrect: false },
      { text: 'NOT CURRENT DATA AUTHORITY or NOT AUTHORIZED NEXT DATA AUTHORITY', isCorrect: true },
      { text: 'MESSAGE NOT SUPPORTED BY THIS AIRCRAFT', isCorrect: false },
      { text: 'INVALID FLIGHT PLAN IDENTIFICATION', isCorrect: false }
    ],
    explanation: 'Sec. 13.2.3.2 specifies that only the downlink message elements NOT CURRENT DATA AUTHORITY or NOT AUTHORIZED NEXT DATA AUTHORITY shall be permitted as reasons for airborne rejection of ATC unit-initiated CPDLC.'
  },
  {
    id: 'MATS-V5-009',
    volume: 'Volume V',
    category: 'Sec. 13.3 CPDLC Unsupported Message',
    reference: 'MATS Part 3 Vol. V, 13.3.2.2.9',
    difficulty: 'Medium',
    question: 'Should an ATS unit select a subset of CPDLC message elements for its airspace and receive a downlink message that does not belong to that subset, how shall the ATC unit respond?',
    options: [
      { text: 'Uplink the message element MESSAGE NOT SUPPORTED BY THIS ATC UNIT', isCorrect: true },
      { text: 'Ignore the downlink message without sending any automated or manual reply', isCorrect: false },
      { text: 'Automatically terminate the CPDLC connection (LOGOFF)', isCorrect: false },
      { text: 'Uplink ROGER followed by a FREE TEXT clarification request', isCorrect: false }
    ],
    explanation: 'Sec. 13.3.2.2.9 requires the ATC unit to respond by uplinking the message element MESSAGE NOT SUPPORTED BY THIS ATC UNIT; further processing of the received message is not required.'
  },
  {
    id: 'MATS-V5-010',
    volume: 'Volume V',
    category: 'Sec. 14.2 Oceanic In-Flight Contingency',
    reference: 'MATS Part 3 Vol. V, 14.2.3.2 & 14.2.3.3',
    difficulty: 'Hard',
    question: 'Under special procedures for in-flight contingencies in oceanic airspace where an aircraft must deviate without prior ATC clearance, what lateral offset shall be established before executing a vertical level offset?',
    options: [
      { text: 'Offset 2.0 NM (3.7 km) to the right, then descend 1 000 ft', isCorrect: false },
      { text: 'Establish a 5.0 NM (9.3 km) parallel, same-direction track offset, then establish a 500 ft vertical offset (or 1 000 ft if above FL 410)', isCorrect: true },
      { text: 'Offset 10.0 NM (18.5 km) to the left while maintaining the assigned flight level', isCorrect: false },
      { text: 'Offset 15.0 NM (27.8 km) to the right without any vertical offset', isCorrect: false }
    ],
    explanation: 'Sec. 14.2.3.2 and 14.2.3.3 require maintaining the assigned flight level until established on a 9.3 km (5.0 NM) parallel, same-direction track offset, then establishing a 150 m (500 ft) vertical offset (or 300 m / 1 000 ft if above FL 410).'
  },
  {
    id: 'MATS-V5-011',
    volume: 'Volume V',
    category: 'Sec. 14.3 Air-Ground Communications Failure',
    reference: 'MATS Part 3 Vol. V, 14.3.3 b) 2)',
    difficulty: 'Medium',
    question: 'If an aircraft experiences air-ground communications failure in IMC within airspace where an ATS surveillance system is used, for how long shall the aircraft maintain its last assigned speed and level (or MFA if higher) before adjusting to the filed flight plan?',
    options: [
      { text: '5 minutes', isCorrect: false },
      { text: '7 minutes', isCorrect: true },
      { text: '15 minutes', isCorrect: false },
      { text: '20 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 14.3.3 b) 2) specifies a period of 7 minutes in airspace where an ATS surveillance system is used (whereas 20 minutes applies in airspace where procedural separation is applied per Sec. 14.3.3 b) 1)).'
  },
  {
    id: 'MATS-V5-012',
    volume: 'Volume V',
    category: 'Sec. 14.7 Similar Call Sign Mitigation',
    reference: 'MATS Part 3 Vol. V, 14.7.6.5',
    difficulty: 'Easy',
    question: 'When two aircraft with similar numeric call sign sequences operate simultaneously on the same frequency (e.g., GIA534 and GIA234), which mitigation measure is recommended by MATS Vol. V?',
    options: [
      { text: 'Omit the telephony designator and address aircraft by flight digits only', isCorrect: false },
      { text: 'Use emphasis for clarity on numbers, full call sign repetition (I SAY AGAIN), call sign suffix addition, or temporary call sign change', isCorrect: true },
      { text: 'Instruct one aircraft to switch off its VHF receiver until clear of the sector', isCorrect: false },
      { text: 'Use the 4-digit SSR squawk code in lieu of the aircraft call sign', isCorrect: false }
    ],
    explanation: 'Sec. 14.7.6.5 recommends emphasis on numbers, full call sign repetition ("I SAY AGAIN"), call sign suffix addition (Departure/Arrival/Location), or temporary call sign modification.'
  },
  {
    id: 'MATS-V5-013',
    volume: 'Volume V',
    category: 'Sec. 14.9 TIBA Collision Avoidance',
    reference: 'MATS Part 3 Vol. V, 14.9.3.2',
    difficulty: 'Hard',
    question: 'Under Traffic Information Broadcast by Aircraft (TIBA) procedures, if a pilot decides that immediate action is required to avoid an imminent collision risk above FL 290 where a 2 000 ft VSM is applied, what immediate vertical manoeuvre shall be executed?',
    options: [
      { text: 'Immediately climb 500 ft and switch on all exterior lights', isCorrect: false },
      { text: 'Immediately descend 150 m (500 ft)', isCorrect: false },
      { text: 'Immediately descend 300 m (1 000 ft), display all available aircraft lighting, and reply to the broadcast as soon as possible', isCorrect: true },
      { text: 'Execute a 5 NM lateral offset to the left of the centre line', isCorrect: false }
    ],
    explanation: 'Sec. 14.9.3.2 a) specifies an immediate descent of 150 m (500 ft), or 300 m (1 000 ft) if above FL 290 in an area where a 600 m (2 000 ft) VSM is applied, displaying all available aircraft lighting and reporting the action.'
  },
  {
    id: 'MATS-V5-014',
    volume: 'Volume V',
    category: 'Sec. 14.10 Indonesia Network Management Centre (INMC)',
    reference: 'MATS Part 3 Vol. V, 14.10.4',
    difficulty: 'Hard',
    question: 'During large-scale operational disruptions or prolonged CNSD facility failures involving Indonesia Network Management Centre (INMC) coordination, how is operational responsibility divided between INMC and ATS units (such as JATSC/MATSC)?',
    options: [
      { text: 'Separation control responsibility is temporarily transferred to INMC until normal operations resume', isCorrect: false },
      { text: 'INMC coordination does not transfer or diminish the operational responsibility of ATS units; ATS units remain fully responsible for ATS within their areas while INMC provides network oversight and facilitates CDM', isCorrect: true },
      { text: 'INMC assumes issuance of inter-FIR ATC clearances while ATS units act solely as Flight Information Centres', isCorrect: false },
      { text: 'ATS units retain responsibility only inside TMAs while INMC directly controls upper CTA airspace above FL 245', isCorrect: false }
    ],
    explanation: 'Sec. 14.10.4 explicitly states that INMC coordination does not transfer or diminish the operational responsibility of ATS units, which remain fully responsible for providing ATS within their respective areas of responsibility.'
  },
  {
    id: 'MATS-V5-015',
    volume: 'Volume V',
    category: 'Sec. 15.5 Strategic Lateral Offset Procedures (SLOP)',
    reference: 'MATS Part 3 Vol. V, 15.5.4 & 15.5.6',
    difficulty: 'Medium',
    question: 'Where Strategic Lateral Offset Procedures (SLOP) are authorized in en-route airspace with route centre line spacing of 15 NM (28 km) or more, in which direction and up to what maximum distance may flight crews apply an offset?',
    options: [
      { text: 'To the left or right of the centre line up to a maximum of 2 NM', isCorrect: false },
      { text: 'To the right of the centre line relative to the direction of flight in tenths of a nautical mile up to a maximum of 2 NM (3.7 km)', isCorrect: true },
      { text: 'To the right of the centre line up to a maximum of 0.5 NM (0.9 km)', isCorrect: false },
      { text: 'To the right of the centre line up to a maximum of 5 NM after obtaining prior ATC clearance', isCorrect: false }
    ],
    explanation: 'Sec. 15.5.4 a) permits offsets to the right of the centre line relative to the direction of flight in tenths of a nautical mile up to 3.7 km (2 NM) where route spacing is 28 km (15 NM) or more; pilots are not required to notify ATC.'
  },
  {
    id: 'MATS-V5-016',
    volume: 'Volume V',
    category: 'Sec. 15.6 Communicable Diseases Notification',
    reference: 'MATS Part 3 Vol. V, 15.6.1 & 15.6.2',
    difficulty: 'Easy',
    question: 'Upon receiving notification from an en-route flight crew of a suspected case of communicable disease or public health risk on board, to whom shall the ATS unit forward the message as soon as possible?',
    options: [
      { text: 'Local military and law enforcement units only', isCorrect: false },
      { text: 'The ATS unit serving the destination/departure aerodrome and the aircraft operator or its designated representative', isCorrect: true },
      { text: 'The destination aerodrome meteorological office only', isCorrect: false },
      { text: 'Broadcast openly on emergency frequency 121.5 MHz every 5 minutes', isCorrect: false }
    ],
    explanation: 'Sec. 15.6.2 requires the ATS unit receiving such notification to forward a message as soon as possible to the ATS unit serving the destination/departure and the aircraft operator or its designated representative.'
  }
];

// Deduplication Safeguard: Guarantees zero duplicate IDs or identical normalized question text
function buildUniqueQuestionBank(items) {
  const seenIds = new Set();
  const seenTexts = new Set();
  const unique = [];

  for (const item of items) {
    const normText = item.question.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!seenIds.has(item.id) && !seenTexts.has(normText)) {
      seenIds.add(item.id);
      seenTexts.add(normText);
      unique.push(item);
    }
  }
  return unique;
}

const QUESTION_BANK = buildUniqueQuestionBank(RAW_QUESTIONS);

// Fisher-Yates shuffle helper
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  // Theme state (default to soft light mode; dark mode uses soft low-glare charcoal)
  const [darkMode, setDarkMode] = useState(false);

  // PWA Install & Offline Readiness States
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);

  // Navigation screen: 'welcome' | 'quiz' | 'results'
  const [screen, setScreen] = useState('welcome');

  // Volume selection & percentage weights
  const [enabledVolumes, setEnabledVolumes] = useState({
    'Volume II': true,
    'Volume III': true,
    'Volume IV': true,
    'Volume V': true
  });

  const [volumeWeights, setVolumeWeights] = useState({
    'Volume II': 30,
    'Volume III': 25,
    'Volume IV': 25,
    'Volume V': 20
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [sessionSize, setSessionSize] = useState(20);
  const [configError, setConfigError] = useState('');

  // Active Quiz states
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const advanceTimeoutRef = useRef(null);

  // Dynamic PWA Manifest, Apple Touch Icon, and Service Worker Registration
  useEffect(() => {
    // 1. Detect if already running in standalone installed mode
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (standalone) setIsInstalled(true);

    // 2. Listen for Android / Desktop Chrome / Edge install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 3. Inject Apple iOS / iPadOS meta tags & SVG app icon dynamically
    const svgIcon = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="112" fill="#0284c7"/>
        <circle cx="256" cy="256" r="170" fill="none" stroke="#e0f2fe" stroke-width="18" opacity="0.45"/>
        <circle cx="256" cy="256" r="105" fill="none" stroke="#e0f2fe" stroke-width="18" opacity="0.7"/>
        <circle cx="256" cy="256" r="26" fill="#ffffff"/>
        <line x1="256" y1="256" x2="385" y2="127" stroke="#34d399" stroke-width="22" stroke-linecap="round"/>
      </svg>`
    );
    const iconDataUrl = `data:image/svg+xml,${svgIcon}`;

    const setMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('apple-mobile-web-app-title', 'ATS SWORD Quiz');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('theme-color', '#0284c7');

    let appleTouch = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleTouch) {
      appleTouch = document.createElement('link');
      appleTouch.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleTouch);
    }
    appleTouch.setAttribute('href', iconDataUrl);

    // 4. Inject Web App Manifest dynamically if not already linked
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifestObj = {
        name: 'ATS SWORD — MATS Part 3 Interactive Quiz',
        short_name: 'ATS SWORD',
        description: 'ICAO-Aligned Question Bank & Assessment Simulator for Manual of ATS (Volume II – V) AirNav Indonesia',
        start_url: window.location.pathname || '/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#f8fafc',
        theme_color: '#0284c7',
        icons: [
          {
            src: iconDataUrl,
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      };
      const manifestBlob = new Blob([JSON.stringify(manifestObj)], {
        type: 'application/manifest+json'
      });
      const manifestUrl = URL.createObjectURL(manifestBlob);
      const manifestLink = document.createElement('link');
      manifestLink.setAttribute('rel', 'manifest');
      manifestLink.setAttribute('href', manifestUrl);
      document.head.appendChild(manifestLink);
    }

    // 5. Register Service Worker for offline support if available on server
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => setIsOfflineReady(true))
        .catch(() => {
          // Safe fallback when running inside sandbox preview without /sw.js
          setIsOfflineReady(false);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Trigger native PWA install prompt or open cross-platform guide modal
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstallModal(true);
    }
  };

  // Timer effect during active quiz
  useEffect(() => {
    if (screen !== 'quiz') return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Toggle volume checkbox
  const toggleVolume = (vol) => {
    setConfigError('');
    setEnabledVolumes((prev) => ({
      ...prev,
      [vol]: !prev[vol]
    }));
  };

  // Update individual volume weight
  const handleWeightChange = (vol, rawValue) => {
    setConfigError('');
    const num = Math.max(0, Math.min(100, Number(rawValue) || 0));
    setVolumeWeights((prev) => ({
      ...prev,
      [vol]: num
    }));
  };

  // Normalize active volume weights so they sum to exactly 100%
  const normalizeWeightsTo100 = () => {
    const activeVols = VOLUME_SPECS.map((v) => v.volume).filter((v) => enabledVolumes[v]);
    if (activeVols.length === 0) return;
    const sum = activeVols.reduce((acc, v) => acc + (volumeWeights[v] || 0), 0);
    if (sum === 0) {
      distributeEqually();
      return;
    }
    const updated = { ...volumeWeights };
    let allocated = 0;
    activeVols.forEach((v, idx) => {
      if (idx === activeVols.length - 1) {
        updated[v] = Math.max(0, 100 - allocated);
      } else {
        const pct = Math.round(((volumeWeights[v] || 0) / sum) * 100);
        updated[v] = pct;
        allocated += pct;
      }
    });
    setVolumeWeights(updated);
  };

  // Distribute 100% equally across enabled volumes
  const distributeEqually = () => {
    const activeVols = VOLUME_SPECS.map((v) => v.volume).filter((v) => enabledVolumes[v]);
    if (activeVols.length === 0) return;
    const base = Math.floor(100 / activeVols.length);
    const rem = 100 - base * activeVols.length;
    const updated = { ...volumeWeights };
    activeVols.forEach((v, idx) => {
      updated[v] = base + (idx < rem ? 1 : 0);
    });
    setVolumeWeights(updated);
  };

  // Compute live allocation preview based on selected volumes, weights, difficulty, and session size
  const allocationPreview = useMemo(() => {
    const activeVols = VOLUME_SPECS.map((v) => v.volume).filter((v) => enabledVolumes[v]);
    const rawTotalWeight = activeVols.reduce((acc, v) => acc + (volumeWeights[v] || 0), 0);

    const breakdown = {};
    let totalPlanned = 0;

    if (activeVols.length > 0 && rawTotalWeight > 0) {
      // Calculate fractional quotas
      const rawQuotas = activeVols.map((vol) => {
        const pool = QUESTION_BANK.filter(
          (q) =>
            q.volume === vol &&
            (selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty)
        );
        const normalizedRatio = (volumeWeights[vol] || 0) / rawTotalWeight;
        const exact = normalizedRatio * sessionSize;
        const floored = Math.min(pool.length, Math.floor(exact));
        return {
          vol,
          poolCount: pool.length,
          normalizedPct: Math.round(normalizedRatio * 100),
          floored,
          remainder: exact - Math.floor(exact)
        };
      });

      let assigned = rawQuotas.reduce((s, r) => s + r.floored, 0);
      let remaining = Math.max(0, sessionSize - assigned);

      // Distribute remainder slots to largest remainders where pool capacity allows
      const sortedByRem = [...rawQuotas].sort((a, b) => b.remainder - a.remainder);
      for (const item of sortedByRem) {
        if (remaining <= 0) break;
        if (item.floored < item.poolCount) {
          item.floored += 1;
          remaining -= 1;
        }
      }

      // If still remaining because some volume had small pool, top up from other active volumes
      if (remaining > 0) {
        for (const item of rawQuotas) {
          while (remaining > 0 && item.floored < item.poolCount) {
            item.floored += 1;
            remaining -= 1;
          }
        }
      }

      rawQuotas.forEach((r) => {
        breakdown[r.vol] = {
          normalizedPct: r.normalizedPct,
          plannedCount: r.floored,
          availablePool: r.poolCount
        };
        totalPlanned += r.floored;
      });
    }

    return {
      activeVols,
      rawTotalWeight,
      breakdown,
      totalPlanned
    };
  }, [enabledVolumes, volumeWeights, selectedDifficulty, sessionSize]);

  // Export JSON database handler
  const handleExportDatabase = () => {
    const exportPayload = {
      metadata: {
        title: 'Manual of Air Traffic Services (MATS) Part 3 - ICAO English Question Bank',
        effective_date: '2026-01-01',
        volumes_covered: ['Volume II', 'Volume III', 'Volume IV', 'Volume V'],
        total_unique_questions: QUESTION_BANK.length,
        exported_at: new Date().toISOString()
      },
      questions: QUESTION_BANK.map((q) => ({
        id: q.id,
        volume: q.volume,
        category: q.category,
        reference: q.reference,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options.map((o) => o.text),
        correct_answer: q.options.find((o) => o.isCorrect)?.text || '',
        explanation: q.explanation
      }))
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MATS_Part3_ICAO_QuestionBank_Vol_II-V_${QUESTION_BANK.length}Q.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Start quiz session
  const startQuiz = () => {
    if (allocationPreview.activeVols.length === 0) {
      setConfigError('Select at least one Volume (Volume II – V) to start the assessment.');
      return;
    }
    if (allocationPreview.rawTotalWeight <= 0 || allocationPreview.totalPlanned === 0) {
      setConfigError('Ensure the total weight percentage is greater than 0% and matching questions are available.');
      return;
    }
    if (allocationPreview.rawTotalWeight <= 0 || allocationPreview.totalPlanned === 0) {
      setConfigError('Pastikan total persentase bobot lebih dari 0% dan tersedia soal pada filter yang dipilih.');
      return;
    }

    setConfigError('');
    let compiled = [];

    allocationPreview.activeVols.forEach((vol) => {
      const targetCount = allocationPreview.breakdown[vol]?.plannedCount || 0;
      if (targetCount > 0) {
        const pool = QUESTION_BANK.filter(
          (q) =>
            q.volume === vol &&
            (selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty)
        );
        const picked = shuffleArray(pool).slice(0, targetCount);
        compiled = compiled.concat(picked);
      }
    });

    const prepared = shuffleArray(compiled).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));

    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    setActiveQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswerHistory([]);
    setElapsedSeconds(0);
    setScreen('quiz');
  };

  // Handle option selection
  const handleSelectAnswer = (optIdx) => {
    if (isAnswered) return;
    const currentQ = activeQuestions[currentIndex];
    const chosen = currentQ.shuffledOptions[optIdx];
    const correctOpt = currentQ.shuffledOptions.find((o) => o.isCorrect);

    setSelectedOption(optIdx);
    setIsAnswered(true);

    if (chosen.isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswerHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        volume: currentQ.volume,
        category: currentQ.category,
        reference: currentQ.reference,
        difficulty: currentQ.difficulty,
        question: currentQ.question,
        selectedText: chosen.text,
        correctText: correctOpt.text,
        isCorrect: chosen.isCorrect,
        explanation: currentQ.explanation
      }
    ]);

    advanceTimeoutRef.current = setTimeout(() => {
      goToNextQuestion();
    }, 2600);
  };

  const goToNextQuestion = () => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setScreen('results');
    }
  };

  const handleManualNext = () => {
    goToNextQuestion();
  };

  const currentQuestion = activeQuestions[currentIndex];
  const progressPercent =
    activeQuestions.length > 0
      ? Math.round(((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100)
      : 0;

  const scorePercentage =
    activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;

  const gradeInfo = useMemo(() => {
    if (scorePercentage >= 90) {
      return {
        label: 'Distinction (Rating Check Ready)',
        color: 'text-emerald-600 dark:text-emerald-400'
      };
    }
    if (scorePercentage >= 75) {
      return {
        label: 'Competent (Meets Evaluation Standard)',
        color: 'text-sky-600 dark:text-sky-400'
      };
    }
    if (scorePercentage >= 60) {
      return {
        label: 'Marginal (Further Procedural Review Advised)',
        color: 'text-amber-600 dark:text-amber-400'
      };
    }
    return {
      label: 'Below Passing Standard (<75%)',
      color: 'text-rose-600 dark:text-rose-400'
    };
  }, [scorePercentage]);

  // Helper for difficulty badge styling
  const getDifficultyBadge = (diff) => {
    if (diff === 'Easy') {
      return darkMode
        ? 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
    if (diff === 'Medium') {
      return darkMode
        ? 'bg-amber-500/12 text-amber-300 border-amber-500/25'
        : 'bg-amber-50 text-amber-700 border-amber-200/80';
    }
    return darkMode
      ? 'bg-rose-500/12 text-rose-300 border-rose-500/25'
      : 'bg-rose-50 text-rose-700 border-rose-200/80';
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-sky-500 selection:text-white ${
        darkMode
          ? 'bg-[#14171c] text-zinc-200'
          : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      {/* Top Navigation Bar */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          darkMode
            ? 'bg-[#181b21]/90 border-zinc-800/80'
            : 'bg-white/90 border-slate-200/80'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
              setScreen('welcome');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="Return to Main Configuration"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-sky-600/90 text-white shadow-md shadow-sky-600/15 group-hover:bg-sky-600 transition-colors">
              <Radar className="w-5 h-5" />
              <span
                className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ${
                  darkMode ? 'ring-[#181b21]' : 'ring-white'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-sm sm:text-base">
                  ATS SWORD
                </span>
                <span
                  className={`hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    darkMode
                      ? 'bg-sky-500/12 text-sky-300 border border-sky-500/25'
                      : 'bg-sky-50 text-sky-700 border border-sky-200/80'
                  }`}
                >
                  AirNav Indonesia
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                MATS Part 3 • Vol. II – V ({QUESTION_BANK.length} Verified Unique Questions)
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {!isInstalled ? (
              <button
                type="button"
                onClick={handleInstallClick}
                title="Download / Install App to Phone, Tablet, iPad, or Laptop"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <MonitorDown className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            ) : (
              <span
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border ${
                  darkMode
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>App Installed</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleExportDatabase}
              title="Export Full Unique JSON Database"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                darkMode
                  ? 'bg-[#1e222a] border-zinc-800 text-emerald-300 hover:bg-[#252a34]'
                  : 'bg-white border-slate-200/90 text-emerald-700 hover:bg-emerald-50/70 shadow-xs'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON ({QUESTION_BANK.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle color theme"
              className={`p-2 rounded-xl border transition-colors ${
                darkMode
                  ? 'bg-[#1e222a] border-zinc-800 text-amber-300 hover:bg-[#252a34]'
                  : 'bg-white border-slate-200/90 text-slate-600 hover:bg-slate-100 shadow-xs'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Cross-Platform PWA Install Guide Modal (Android, iOS/iPadOS, Windows/Mac) */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
              darkMode
                ? 'bg-[#1b1f26] border-zinc-800 text-zinc-100'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    Download & Install ATS SWORD App
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    Runs standalone like a native application with full offline support.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 my-5 text-xs sm:text-sm">
              {/* Apple iPhone / iPad */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1.5">
                  <span>1. Apple iPhone & iPad (Safari)</span>
                </div>
                <p className={darkMode ? 'text-zinc-300' : 'text-slate-600'}>
                  Open this web app in <strong>Safari</strong>, tap the{' '}
                  <span className="inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-300">
                    <Share className="w-3 h-3" /> Share
                  </span>{' '}
                  icon on the toolbar, then select{' '}
                  <span className="inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-300">
                    <PlusSquare className="w-3 h-3" /> Add to Home Screen
                  </span>
                  .
                </p>
              </div>

              {/* Android Phone & Tablet */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  2. Android Phone & Tablet (Chrome / Edge)
                </div>
                <p className={darkMode ? 'text-zinc-300' : 'text-slate-600'}>
                  Tap the three-dot menu (<strong>⋮</strong>) in the top-right corner of the
                  browser, then select <strong>"Install app"</strong> or{' '}
                  <strong>"Add to Home screen"</strong>.
                </p>
              </div>

              {/* Laptop / PC */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  3. Laptop / Desktop PC (Windows, macOS, Linux)
                </div>
                <p className={darkMode ? 'text-zinc-300' : 'text-slate-600'}>
                  Click the <strong>Install (⊕ / screen with arrow)</strong> icon on the right
                  side of the Google Chrome or Microsoft Edge address bar to install as a desktop
                  app.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 dark:border-zinc-800">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                <WifiOff className="w-3.5 h-3.5 text-emerald-500" />
                {isOfflineReady ? 'Ready for offline operation' : 'Multi-Device PWA Ready'}
              </span>
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* ================================================================ */}
        {/* SCREEN 1: WELCOME & VOLUME PROPORTION CONFIGURATOR               */}
        {/* ================================================================ */}
        {screen === 'welcome' && (
          <div className="space-y-7">
            {/* Hero Section */}
            <div className="text-center space-y-3.5 max-w-3xl mx-auto">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border ${
                  darkMode
                    ? 'bg-sky-500/10 text-sky-300 border-sky-500/25'
                    : 'bg-sky-50 text-sky-700 border-sky-200/80'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>{QUESTION_BANK.length} Unique Non-Overlapping Questions • Vol. II – V</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                ATS Proficiency &{' '}
                <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  MATS Question Bank
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                Configure your desired combination of <strong>Volume II through Volume V</strong>,
                set custom <strong>percentage weightings (%)</strong> per volume, and filter by
                proficiency tier (<em>Easy, Medium, Hard</em>) in accordance with ICAO PANS-ATM and
                MATS Part 3 standards.
              </p>
            </div>

            {/* Volume & Percentage Configurator Card */}
            <div
              className={`rounded-2xl border p-5 sm:p-7 transition-all ${
                darkMode
                  ? 'bg-[#1b1f26] border-zinc-800/90 shadow-xl shadow-black/20'
                  : 'bg-white border-slate-200/90 shadow-lg shadow-slate-200/40'
              }`}
            >
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? 'bg-sky-500/12 text-sky-300' : 'bg-sky-50 text-sky-600'
                    }`}
                  >
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold">
                      1. Select Volumes & Percentage Allocation
                    </h2>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                      Check the volumes to include and adjust their relative percentage weights.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={normalizeWeightsTo100}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      darkMode
                        ? 'bg-[#222730] border-zinc-700/80 text-zinc-200 hover:bg-[#2a303b]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Normalize to 100%
                  </button>
                  <button
                    type="button"
                    onClick={distributeEqually}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      darkMode
                        ? 'bg-[#222730] border-zinc-700/80 text-sky-300 hover:bg-[#2a303b]'
                        : 'bg-sky-50/80 border-sky-200/80 text-sky-700 hover:bg-sky-100/70'
                    }`}
                  >
                    Equal Split (%)
                  </button>
                </div>
              </div>

              {/* 4 Volume Cards with Toggle + Percentage Slider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {VOLUME_SPECS.map((spec) => {
                  const isEnabled = enabledVolumes[spec.volume];
                  const weight = volumeWeights[spec.volume] || 0;
                  const volUniqueTotal = QUESTION_BANK.filter((q) => q.volume === spec.volume).length;
                  const preview = allocationPreview.breakdown[spec.volume] || {
                    normalizedPct: 0,
                    plannedCount: 0,
                    availablePool: 0
                  };

                  return (
                    <div
                      key={spec.volume}
                      className={`rounded-xl border p-4 transition-all ${
                        isEnabled
                          ? darkMode
                            ? 'bg-[#21262f] border-sky-500/35'
                            : 'bg-sky-50/45 border-sky-200'
                          : darkMode
                          ? 'bg-[#171a20] border-zinc-800/80 opacity-60'
                          : 'bg-slate-50/90 border-slate-200/80 opacity-65'
                      }`}
                    >
                      {/* Top Row: Checkbox + Volume Name + Quota Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => toggleVolume(spec.volume)}
                            className="mt-1 w-4 h-4 rounded accent-sky-600 cursor-pointer"
                          />
                          <div>
                            <div className="font-bold text-sm flex items-center gap-2">
                              <span>Part 3 • {spec.volume}</span>
                              <span
                                className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                                  darkMode
                                    ? 'bg-[#282e39] text-zinc-300'
                                    : 'bg-white border border-slate-200/90 text-slate-600'
                                }`}
                              >
                                {volUniqueTotal} Questions
                              </span>
                            </div>
                            <p
                              className={`text-xs mt-0.5 ${
                                darkMode ? 'text-zinc-400' : 'text-slate-600'
                              }`}
                            >
                              {spec.title}
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Section Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3 pl-6">
                        {spec.sections.map((sec) => (
                          <span
                            key={sec}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              darkMode
                                ? 'bg-[#282e39] text-zinc-400'
                                : 'bg-white border border-slate-200/80 text-slate-500'
                            }`}
                          >
                            {sec}
                          </span>
                        ))}
                      </div>

                      {/* Slider & Numeric Input */}
                      <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            disabled={!isEnabled}
                            value={isEnabled ? weight : 0}
                            onChange={(e) => handleWeightChange(spec.volume, e.target.value)}
                            className="w-full accent-sky-600 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              disabled={!isEnabled}
                              value={isEnabled ? weight : 0}
                              onChange={(e) => handleWeightChange(spec.volume, e.target.value)}
                              className={`w-14 px-2 py-1 text-right text-xs font-mono font-bold rounded-lg border focus:outline-none ${
                                darkMode
                                  ? 'bg-[#181b21] border-zinc-700 text-zinc-100'
                                  : 'bg-white border-slate-300 text-slate-800'
                              }`}
                            />
                            <span className="text-xs font-bold text-slate-400">%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px]">
                          <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>
                            Effective Share:{' '}
                            <strong className={darkMode ? 'text-sky-300' : 'text-sky-700'}>
                              {preview.normalizedPct}%
                            </strong>
                          </span>
                          <span className={darkMode ? 'text-zinc-300' : 'text-slate-700'}>
                            Session Quota:{' '}
                            <strong>{preview.plannedCount} items</strong>{' '}
                            <span className="text-slate-400">
                              ({preview.availablePool} available)
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Weight Indicator Bar */}
              <div
                className={`rounded-xl border p-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  allocationPreview.rawTotalWeight === 100
                    ? darkMode
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                      : 'bg-emerald-50/80 border-emerald-200/80 text-emerald-800'
                    : darkMode
                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                    : 'bg-amber-50/80 border-amber-200/80 text-amber-800'
                }`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <SlidersHorizontal className="w-4 h-4 shrink-0" />
                  <span>
                    Total Input Weight: <strong>{allocationPreview.rawTotalWeight}%</strong>
                    {allocationPreview.rawTotalWeight !== 100 &&
                      allocationPreview.rawTotalWeight > 0 &&
                      ' (Automatically normalized proportionally to 100%)'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold">
                  Session Total: {allocationPreview.totalPlanned} / {sessionSize} Questions
                </div>
              </div>

              {/* Difficulty & Session Size Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Difficulty Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-zinc-400">
                    2. Filter by Difficulty Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DIFFICULTY_LEVELS.map((lvl) => {
                      const active = selectedDifficulty === lvl.id;
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setSelectedDifficulty(lvl.id)}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                            active
                              ? 'bg-sky-600/95 border-sky-600 text-white shadow-sm'
                              : darkMode
                              ? 'bg-[#21262f] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                              : 'bg-slate-50/90 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Session Question Count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-zinc-400">
                    3. Questions per Assessment Session
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {SESSION_SIZE_OPTIONS.map((count) => {
                      const active = sessionSize === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setSessionSize(count)}
                          className={`py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                            active
                              ? 'bg-sky-600/95 border-sky-600 text-white shadow-sm'
                              : darkMode
                              ? 'bg-[#21262f] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                              : 'bg-slate-50/90 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {count} Qs
                        </button>
                      );
                    })}
                  </div>
                  <p className={`text-[11px] mt-2 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    Estimated completion time: ~{Math.round(sessionSize * 1.2)} mins • Answer
                    choices randomized automatically.
                  </p>
                </div>
              </div>

              {/* Validation Error Message */}
              {configError && (
                <div className="mt-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{configError}</span>
                </div>
              )}

              {/* Start Button */}
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Reference: Manual of ATS (Effective 1-Jan-26) • ICAO Doc 4444 Aligned
                  </span>
                </div>

                <button
                  type="button"
                  onClick={startQuiz}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Assessment ({allocationPreview.totalPlanned} Questions)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCREEN 2: ACTIVE QUIZ                                            */}
        {/* ================================================================ */}
        {screen === 'quiz' && currentQuestion && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Top Status & Progress Bar */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                darkMode ? 'bg-[#1b1f26] border-zinc-800/90' : 'bg-white border-slate-200/90 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${
                      darkMode ? 'bg-sky-500/12 text-sky-300' : 'bg-sky-50 text-sky-700'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Question {currentIndex + 1} / {activeQuestions.length}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getDifficultyBadge(
                      currentQuestion.difficulty
                    )}`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    Score: <strong className="text-emerald-500">{score}</strong>
                  </span>
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg ${
                      darkMode
                        ? 'bg-[#222730] text-zinc-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{formatTime(elapsedSeconds)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className={`w-full h-2 rounded-full overflow-hidden ${
                  darkMode ? 'bg-[#262b35]' : 'bg-slate-100'
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                darkMode
                  ? 'bg-[#1b1f26] border-zinc-800/90 shadow-xl shadow-black/20'
                  : 'bg-white border-slate-200/90 shadow-lg shadow-slate-200/35'
              }`}
            >
              {/* Reference & Category Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                    darkMode
                      ? 'bg-[#242933] text-zinc-300 border border-zinc-700/80'
                      : 'bg-slate-100/90 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  <span>{currentQuestion.category}</span>
                </span>
                <span
                  className={`text-xs font-mono ${
                    darkMode ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  {currentQuestion.reference} • {currentQuestion.id}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold leading-snug mb-6">
                {currentQuestion.question}
              </h2>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQuestion.shuffledOptions.map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = opt.isCorrect;

                  let buttonStyle = darkMode
                    ? 'bg-[#21262f] border-zinc-800 hover:border-sky-500/45 hover:bg-[#262c36] text-zinc-200'
                    : 'bg-slate-50/75 border-slate-200/90 hover:border-sky-400 hover:bg-sky-50/45 text-slate-800';

                  let badgeStyle = darkMode
                    ? 'bg-[#2a303c] text-zinc-300 border-zinc-700'
                    : 'bg-white text-slate-600 border-slate-300/90';

                  if (isAnswered) {
                    if (isCorrectOption) {
                      buttonStyle = darkMode
                        ? 'bg-emerald-500/12 border-emerald-500/60 text-emerald-200'
                        : 'bg-emerald-50/90 border-emerald-500 text-emerald-950';
                      badgeStyle = 'bg-emerald-500 text-white border-emerald-500';
                    } else if (isSelected && !isCorrectOption) {
                      buttonStyle = darkMode
                        ? 'bg-rose-500/12 border-rose-500/60 text-rose-200'
                        : 'bg-rose-50/90 border-rose-500 text-rose-950';
                      badgeStyle = 'bg-rose-500 text-white border-rose-500';
                    } else {
                      buttonStyle = darkMode
                        ? 'bg-[#181b21]/70 border-zinc-800/60 text-zinc-500 opacity-60'
                        : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-65';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 flex items-start gap-3.5 ${buttonStyle} ${
                        !isAnswered ? 'cursor-pointer active:scale-[0.995]' : 'cursor-default'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-colors ${badgeStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 text-sm sm:text-base font-medium leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Banner */}
              {isAnswered && (
                <div
                  className={`mt-6 p-4 rounded-xl border text-sm leading-relaxed ${
                    currentQuestion.shuffledOptions[selectedOption]?.isCorrect
                      ? darkMode
                        ? 'bg-emerald-950/35 border-emerald-500/25 text-emerald-200'
                        : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : darkMode
                      ? 'bg-amber-950/35 border-amber-500/25 text-amber-200'
                      : 'bg-amber-50/80 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold flex items-center gap-1.5">
                      {currentQuestion.shuffledOptions[selectedOption]?.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          Correct Answer!
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-500" />
                          Incorrect — MATS Reference Rationale:
                        </>
                      )}
                    </span>
                    <span className="text-xs opacity-75">Auto-advancing...</span>
                  </div>
                  <p className="opacity-95">{currentQuestion.explanation}</p>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleManualNext}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>
                        {currentIndex + 1 < activeQuestions.length
                          ? 'Next Question'
                          : 'View Results'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* SCREEN 3: FINAL SCOREBOARD & REVIEW                              */}
        {/* ================================================================ */}
        {screen === 'results' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Summary Score Card */}
            <div
              className={`p-6 sm:p-10 rounded-3xl border text-center relative overflow-hidden ${
                darkMode
                  ? 'bg-[#1b1f26] border-zinc-800/90 shadow-xl shadow-black/25'
                  : 'bg-white border-slate-200/90 shadow-xl shadow-slate-200/40'
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/12 text-sky-500 mb-4">
                <Award className="w-9 h-9" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                MATS Proficiency Assessment Complete
              </h2>
              <p className={`mt-1 text-sm ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Competency Evaluation — MATS Part 3 ({activeQuestions.length} Questions)
              </p>

              {/* Big Score Display */}
              <div className="my-7 flex flex-col items-center justify-center">
                <div className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  {scorePercentage}%
                </div>
                <div className={`mt-2 text-base font-bold ${gradeInfo.color}`}>
                  {gradeInfo.label}
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-lg mx-auto mb-8">
                <div
                  className={`p-3.5 rounded-2xl border ${
                    darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50/90 border-slate-200/80'
                  }`}
                >
                  <div className="text-xs text-slate-400">Correct</div>
                  <div className="text-xl font-extrabold text-emerald-500 mt-0.5">
                    {score} / {activeQuestions.length}
                  </div>
                </div>
                <div
                  className={`p-3.5 rounded-2xl border ${
                    darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50/90 border-slate-200/80'
                  }`}
                >
                  <div className="text-xs text-slate-400">Incorrect</div>
                  <div className="text-xl font-extrabold text-rose-500 mt-0.5">
                    {activeQuestions.length - score}
                  </div>
                </div>
                <div
                  className={`p-3.5 rounded-2xl border ${
                    darkMode ? 'bg-[#21262f] border-zinc-800' : 'bg-slate-50/90 border-slate-200/80'
                  }`}
                >
                  <div className="text-xs text-slate-400">Elapsed Time</div>
                  <div className="text-xl font-extrabold text-sky-500 mt-0.5 font-mono">
                    {formatTime(elapsedSeconds)}
                  </div>
                </div>
              </div>

              {/* Breakdown Per Volume */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-8 text-left">
                {VOLUME_SPECS.map((spec) => {
                  const volRecords = answerHistory.filter((r) => r.volume === spec.volume);
                  if (volRecords.length === 0) return null;
                  const volCorrect = volRecords.filter((r) => r.isCorrect).length;
                  return (
                    <div
                      key={spec.volume}
                      className={`p-3 rounded-xl border ${
                        darkMode
                          ? 'bg-[#21262f]/90 border-zinc-800'
                          : 'bg-slate-50/90 border-slate-200/80'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-sky-500">{spec.shortLabel}</div>
                      <div className="text-sm font-extrabold mt-0.5">
                        {volCorrect} / {volRecords.length}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Accuracy {Math.round((volCorrect / volRecords.length) * 100)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Same Mix (Reshuffled)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScreen('welcome')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer ${
                    darkMode
                      ? 'bg-[#21262f] border-zinc-700/80 text-zinc-200 hover:bg-[#282e39]'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Change Volumes & Percentages</span>
                </button>
              </div>
            </div>

            {/* Detailed Answer Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold px-1">
                Answer Review & MATS Part 3 References
              </h3>

              {answerHistory.map((item, idx) => (
                <div
                  key={`${item.questionId}-${idx}`}
                  className={`p-5 rounded-2xl border transition-colors ${
                    item.isCorrect
                      ? darkMode
                        ? 'bg-[#1b1f26] border-emerald-500/25'
                        : 'bg-white border-emerald-200/80'
                      : darkMode
                      ? 'bg-[#1b1f26] border-rose-500/30'
                      : 'bg-white border-rose-200/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          item.isCorrect
                            ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-300'
                            : 'bg-rose-500/12 text-rose-600 dark:text-rose-300'
                        }`}
                      >
                        {item.isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        Item #{idx + 1} • {item.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(
                          item.difficulty
                        )}`}
                      >
                        {item.difficulty}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {item.reference} • {item.category}
                    </span>
                  </div>

                  <p className="font-semibold text-sm sm:text-base mb-3">{item.question}</p>

                  <div className="space-y-1.5 text-xs sm:text-sm mb-3">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-slate-400 min-w-[115px]">
                        Your Answer:
                      </span>
                      <span
                        className={
                          item.isCorrect
                            ? 'text-emerald-600 dark:text-emerald-300 font-semibold'
                            : 'text-rose-600 dark:text-rose-300 font-semibold'
                        }
                      >
                        {item.selectedText}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-slate-400 min-w-[115px]">
                          Correct Answer:
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-300 font-semibold">
                          {item.correctText}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      darkMode ? 'bg-[#21262f] text-zinc-300' : 'bg-slate-50/90 text-slate-600'
                    }`}
                  >
                    <strong>Explanation:</strong> {item.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}