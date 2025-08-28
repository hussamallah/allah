/**
 * ⚠️ FROZEN: Chamber V1
 * This component is locked. Do not modify V1 content/structure.
 * Update V2 instead: components/chamber/v2/index.tsx
 * 
 * This component is protected by:
 * 1. Snapshot tests that will fail if markup changes
 * 2. Hash checks in CI that prevent builds if V1 changes
 * 3. Explicit separation from V2 development
 * 4. DO NOT RE-EXPORT from components/index.ts
 */

'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LandingPageTracker from '../../LandingPageTracker'
import ConversionTracker from '../../ConversionTracker'
