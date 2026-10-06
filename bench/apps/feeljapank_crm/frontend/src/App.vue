<template>
  <div class="p-4 max-w-[1100px]">
    <div v-if="!deal" class="p-6 border border-gray-300 rounded-lg">
      <b>FeelJapanK Workspace</b><br />
      Open this workspace with a Deal, e.g.
      <code>/app/fjk-workspace?deal=CRM-DEAL-2026-00010</code>
    </div>

    <div v-else>
      <div class="fjk-sticky">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 800; line-height: 1.15;">
            {{ derivedTitle || deal }}
          </h1>
          <div class="text-gray-600 text-sm mt-1">
            <span v-if="summary">{{ summary.organization || "—" }}</span>
            <span v-else>Loading…</span>
            <span v-if="summary"> · {{ summary.status || "—" }}</span>
          </div>
        </div>
        <Button label="Open in CRM" @click="openInCRM" />
      </div>

      <div v-if="error" class="mb-3 rounded-md bg-red-100 px-3 py-2 text-red-800">{{ error }}</div>
      <div v-if="busy" class="mb-2 text-gray-500">Working…</div>

      <div class="mb-3 flex gap-2">
        <Button :variant="tab === 'summary' ? 'solid' : undefined" label="Summary" @click="tab = 'summary'" />
        <Button :variant="tab === 'details' ? 'solid' : undefined" label="Full Details" @click="tab = 'details'" />
        <Button
          :variant="tab === 'supplier' ? 'solid' : undefined"
          label="Supplier Quotation"
          @click="tab = 'supplier'"
        />
      </div>
      </div>

      <!-- SUMMARY -->
      <template v-if="tab === 'summary'">
        <section class="border border-gray-200 rounded-lg p-3 mb-3">
          <b>Deal Summary</b>
          <div v-if="summary" class="mt-2 text-sm space-y-1">
            <div>Company: <b>{{ summary.organization || "—" }}</b></div>
            <div>Destination / route: <b>{{ travel.destination }}</b></div>
            <div>Dates: <b>{{ travel.dates }}</b> · Duration: <b>{{ travel.duration }}</b></div>
            <div>Passenger composition: <b>{{ paxComposition }}</b></div>
            <div>Scope: <b>{{ scopeLabel }}</b></div>
            <div>Status: <b>{{ summary.status || "—" }}</b> · Next action: <b>{{ summary.next_step || "—" }}</b></div>
          </div>
          <div v-else class="mt-2 text-gray-500">Loading summary…</div>
        </section>

        <section v-for="cat in summaryCategories" :key="cat.label" class="border border-gray-200 rounded-lg p-3 mb-3">
          <b>{{ cat.label }}</b>
          <div class="mt-2 text-sm">
            <span v-if="!cat.items.length" class="text-gray-500">None recorded.</span>
            <ul v-else class="ml-4 list-disc">
              <li v-for="(it, i) in cat.items" :key="i">
                {{ it.text }}
                <span class="fjk-status" :class="statusClass(it.status)">
                  <span v-if="statusCue(it.status)" class="fjk-cue">{{ statusCue(it.status) }}</span>{{ it.status || "—" }}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section class="border border-gray-200 rounded-lg p-3 mb-3">
          <b>Information Status</b>
          <div v-if="summary" class="mt-2 text-sm space-y-2">
            <div>
              Ready to proceed: <b>{{ summary.ready_for_quotation ? "Yes" : "Not yet" }}</b>
              <span class="text-gray-500"> (advisory)</span>
            </div>
            <div>
              <div class="fjk-status fjk-st-known">Collected</div>
              <span v-if="!collectedItems.length" class="text-gray-500">Nothing recorded yet.</span>
              <ul v-else class="ml-4 list-disc">
                <li v-for="(c, i) in collectedItems" :key="'c' + i">{{ c }}</li>
              </ul>
            </div>
            <div>
              <div class="fjk-status fjk-st-confirm"><span class="fjk-cue">?</span>To confirm</div>
              <span v-if="!outstanding.to_confirm.length" class="text-gray-500">None outstanding.</span>
              <ul v-else class="ml-4 list-disc">
                <li v-for="t in outstanding.to_confirm" :key="'t' + t.area + t.item">
                  {{ t.area }}{{ t.domain ? " / " + t.domain : "" }}: {{ t.item }}
                </li>
              </ul>
            </div>
            <div>
              <div class="fjk-status fjk-st-missing"><span class="fjk-cue">!</span>Missing</div>
              <span v-if="!outstanding.missing.length" class="text-gray-500">Nothing missing.</span>
              <ul v-else class="ml-4 list-disc">
                <li v-for="m in outstanding.missing" :key="'m' + m.area + m.item">
                  {{ m.area }}{{ m.domain ? " / " + m.domain : "" }}: {{ m.item }}
                </li>
              </ul>
            </div>
            <div v-if="customerConfirmedItems.length">
              <div class="fjk-status fjk-st-confirmed"><span class="fjk-cue">✓</span>Customer-confirmed</div>
              <ul class="ml-4 list-disc">
                <li v-for="(c, i) in customerConfirmedItems" :key="'cc' + i">{{ c }}</li>
              </ul>
            </div>
            <div class="text-xs text-gray-500">
              Advisory only. The operator decides whether the information is sufficient.
            </div>
          </div>
          <div class="mt-3 flex items-center gap-2" v-if="summary">
            <span>Info Complete: <b>{{ summary.info_complete ? "YES" : "NO" }}</b></span>
            <Button
              v-if="!summary.info_complete"
              variant="solid"
              label="Mark Info Complete"
              @click="setInfoComplete(true)"
            />
            <Button v-else label="Reopen Information Collection" @click="setInfoComplete(false)" />
          </div>
          <div class="mt-1 text-xs text-gray-500">
            Info Complete means the operator considers the information sufficient to proceed. It does not mean
            customer acceptance, supplier acceptance, quotation confirmation, Deal Won, or Trip creation.
          </div>
        </section>
      </template>

      <!-- FULL DETAILS -->
      <template v-else-if="tab === 'details'">
        <section class="border border-gray-200 rounded-lg p-3 mb-3">
          <b>Full Details · Information Gathering (read-only)</b>
          <div v-if="summary" class="mt-2 text-sm">
            <div class="text-gray-500">Deal ID: <b>{{ deal }}</b></div>

            <!-- 1. Deal / Customer Context -->
            <div class="mt-3 font-medium">Deal / Customer Context</div>
            <table class="w-full border-collapse">
              <tbody>
                <tr v-for="row in sharedRows" :key="row.label" class="border-t border-gray-100">
                  <td class="py-1 pr-2 align-top text-gray-600">{{ row.label }}</td>
                  <td class="py-1">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>

            <!-- Requested components -->
            <div class="mt-3 font-medium">Requested Components</div>
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th align="left">Component</th><th align="left">Requested</th>
                  <th align="left">Status</th><th align="left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in summary.components || []" :key="c.component" class="border-t border-gray-100">
                  <td>{{ c.component }}</td>
                  <td>{{ c.requested ? "yes" : "no" }}</td>
                  <td>{{ c.status || "—" }}</td>
                  <td>{{ c.notes || "" }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 3-5. Day-by-Day Domain Detail — primary domains (advisory) -->
            <div class="mt-4 font-medium">Primary Domain Detail — Day-by-Day <span class="text-gray-500 font-normal">(advisory)</span></div>
            <div class="text-xs text-gray-500 mb-1">
              Advisory only — built from captured requirement lines. It does not assert that every day requires a line,
              does not invent data, and does not change readiness.
            </div>
            <div v-if="!dayRangeAvailable" class="text-xs text-amber-700 mb-1">
              Trip window not established from current data — showing captured requirement lines per domain (no day grouping).
            </div>

            <div v-for="blk in dayDomainBlocks" :key="blk.domain" class="mt-3">
              <div class="font-medium border-b border-gray-200 pb-1">{{ blk.domain }}</div>

              <template v-if="blk.days.length">
                <div v-for="d in blk.days" :key="d.date" class="mt-2">
                  <div class="text-sm font-medium">
                    {{ fmtDateHuman(d.date) }} <span class="text-gray-500 font-normal">· Day {{ d.day }}</span>
                  </div>
                  <div v-if="!d.items.length" class="text-xs text-gray-500 ml-1">
                    No {{ blk.domain.toLowerCase() }} requirement line captured for this day (advisory).
                  </div>
                  <template v-else>
                    <table v-if="blk.domain === 'Meals'" class="w-full text-xs mt-1 border-collapse">
                      <tbody>
                        <tr v-for="slot in mealSlots(d.items)" :key="slot.label">
                          <td class="align-top text-gray-600 pr-2" style="width: 90px;">{{ slot.label }}</td>
                          <td class="py-0.5">
                            <span v-if="!slot.rows.length" class="text-gray-400">—</span>
                            <span v-for="(m, mi) in slot.rows" :key="mi" style="margin-right: 8px;">
                              {{ m.item }}<span v-if="m.detail"> · {{ m.detail }}</span>
                              <span class="fjk-status" :class="statusClass(m.status)" style="margin-left: 4px;"><span v-if="statusCue(m.status)" class="fjk-cue">{{ statusCue(m.status) }}</span>{{ m.status || "—" }}</span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table v-else class="w-full text-xs mt-1 border-collapse">
                      <thead>
                        <tr>
                          <th align="left">Item</th><th align="left">Detail</th>
                          <th align="left">Location / Route</th><th align="left">Pax / Qty</th><th align="left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(r, ri) in d.items" :key="ri" class="border-t border-gray-100">
                          <td>{{ r.item }}</td>
                          <td>{{ r.detail || "" }}</td>
                          <td>{{ r.location || "" }}</td>
                          <td>{{ r.pax_or_qty || "" }}</td>
                          <td><span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </div>

                <div v-if="blk.undated.length" class="mt-2 text-xs">
                  <span class="text-gray-600">Undated lines:</span>
                  <span v-for="(r, ri) in blk.undated" :key="'u' + ri" style="margin-left: 6px;">
                    {{ r.item }}
                    <span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span>
                  </span>
                </div>
                <div v-if="blk.outOfWindow.length" class="mt-2 text-xs text-amber-700">
                  {{ blk.outOfWindow.length }} line(s) dated outside the trip window (advisory).
                </div>
              </template>

              <template v-else>
                <div v-if="!blk.rows.length" class="text-xs text-gray-500 mt-1">
                  No {{ blk.domain.toLowerCase() }} requirement lines captured.
                </div>
                <table v-else class="w-full text-xs mt-1 border-collapse">
                  <thead>
                    <tr>
                      <th align="left">Dates</th><th align="left">Item</th><th align="left">Detail</th>
                      <th align="left">Location / Route</th><th align="left">Pax / Qty</th><th align="left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, ri) in blk.rows" :key="ri" class="border-t border-gray-100">
                      <td>{{ fmtDateHuman(r.date_from) }}{{ r.date_to ? " – " + fmtDateHuman(r.date_to) : "" }}</td>
                      <td>{{ r.item }}</td>
                      <td>{{ r.detail || "" }}</td>
                      <td>{{ r.location || "" }}</td>
                      <td>{{ r.pax_or_qty || "" }}</td>
                      <td><span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span></td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>

            <!-- 5b. Allocation & Validation (advisory; editing happens in CRM) -->
            <div class="mt-4 font-medium">Allocation &amp; Validation <span class="text-gray-500 font-normal">(advisory; allocation is edited in CRM)</span></div>
            <div class="text-xs text-gray-500 mb-1">
              Advisory only. The suggested allocation is not prescriptive; the operator controls the actual allocation in CRM.
              Validation is non-blocking and does not change readiness.
            </div>

            <div class="mt-3">
              <div class="font-medium border-b border-gray-200 pb-1">Transportation Allocation</div>
              <div v-if="!transportContexts.length" class="text-xs text-gray-500 mt-1">No transportation allocation recorded.</div>
              <div v-for="(c, ci) in transportContexts" :key="'ta' + ci" class="mt-2 border border-gray-200 rounded p-2">
                <div class="text-sm font-medium">
                  {{ c.name || "Transport" }}
                  <span class="text-gray-500 font-normal">{{ fmtDateHuman(c.date_from) }}{{ c.date_to && c.date_to !== c.date_from ? " – " + fmtDateHuman(c.date_to) : "" }}<span v-if="c.location"> · {{ c.location }}</span></span>
                  <span class="fjk-status" :class="allocStateClass(c.state)" style="margin-left: 6px;"><span v-if="allocStateCue(c.state)" class="fjk-cue">{{ allocStateCue(c.state) }}</span>{{ c.state }}</span>
                </div>
                <table class="w-full text-xs mt-1 border-collapse">
                  <thead>
                    <tr>
                      <th align="left">Vehicle Type</th><th align="left">Capacity</th><th align="left">Qty</th>
                      <th align="left">Capacity Total</th><th align="left">Allocated Pax</th><th align="left">Special</th><th align="left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, ri) in c.rows" :key="ri" class="border-t border-gray-100">
                      <td>{{ r.type || "" }}</td>
                      <td>{{ r.capacity || "" }}</td>
                      <td>{{ r.quantity || "" }}</td>
                      <td>{{ r.row_capacity }}</td>
                      <td>{{ r.allocated_pax || "" }}</td>
                      <td>{{ r.is_special ? "yes" : "" }}</td>
                      <td><span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span></td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-xs mt-1 text-gray-600">
                  Demand: <b>{{ c.demand === null || c.demand === undefined ? "—" : c.demand }}</b>
                  · Total capacity: <b>{{ c.total_capacity }}</b>
                  · Allocated: <b>{{ c.total_allocated }}</b>
                  · Remaining: <b>{{ c.remaining === null ? "—" : c.remaining }}</b>
                  · Excess: <b>{{ c.excess }}</b>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div class="font-medium border-b border-gray-200 pb-1">Accommodation Allocation</div>
              <div v-if="!accommodationContexts.length" class="text-xs text-gray-500 mt-1">No accommodation allocation recorded.</div>
              <div v-for="(c, ci) in accommodationContexts" :key="'aa' + ci" class="mt-2 border border-gray-200 rounded p-2">
                <div class="text-sm font-medium">
                  {{ c.name || "Stay" }}
                  <span class="text-gray-500 font-normal">{{ fmtDateHuman(c.date_from) }}{{ c.date_to && c.date_to !== c.date_from ? " – " + fmtDateHuman(c.date_to) : "" }}<span v-if="c.location"> · {{ c.location }}</span></span>
                  <span class="fjk-status" :class="allocStateClass(c.state)" style="margin-left: 6px;"><span v-if="allocStateCue(c.state)" class="fjk-cue">{{ allocStateCue(c.state) }}</span>{{ c.state }}</span>
                </div>
                <table class="w-full text-xs mt-1 border-collapse">
                  <thead>
                    <tr>
                      <th align="left">Room Type</th><th align="left">Occupancy</th><th align="left">Qty</th>
                      <th align="left">Capacity Total</th><th align="left">Allocated Pax</th><th align="left">Special</th><th align="left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(r, ri) in c.rows" :key="ri" class="border-t border-gray-100">
                      <td>{{ r.type || "" }}</td>
                      <td>{{ r.capacity || "" }}</td>
                      <td>{{ r.quantity || "" }}</td>
                      <td>{{ r.row_capacity }}</td>
                      <td>{{ r.allocated_pax || "" }}</td>
                      <td>{{ r.is_special ? "yes" : "" }}</td>
                      <td><span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span></td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-xs mt-1 text-gray-600">
                  Demand: <b>{{ c.demand === null || c.demand === undefined ? "—" : c.demand }}</b>
                  · Total capacity: <b>{{ c.total_capacity }}</b>
                  · Allocated: <b>{{ c.total_allocated }}</b>
                  · Remaining: <b>{{ c.remaining === null ? "—" : c.remaining }}</b>
                  · Excess: <b>{{ c.excess }}</b>
                </div>
              </div>
            </div>

            <!-- 6. Special / Other Requirements (non-primary domains) -->
            <div v-for="grp in detailReqGroups" :key="grp.domain" class="mt-3">
              <div class="font-medium">{{ grp.domain }}</div>
              <span v-if="!grp.rows.length" class="text-gray-500">None recorded.</span>
              <table v-else class="w-full border-collapse">
                <thead>
                  <tr>
                    <th align="left">Domain</th><th align="left">Item</th><th align="left">Detail</th>
                    <th align="left">Dates</th><th align="left">Pax/Qty</th><th align="left">Location</th>
                    <th align="left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="r in grp.rows"
                    :key="r.domain + r.item + (r.detail || '')"
                    class="border-t border-gray-100"
                  >
                    <td>{{ r.domain }}</td>
                    <td>{{ r.item }}</td>
                    <td>{{ r.detail || "" }}</td>
                    <td>{{ r.date_from || "" }}{{ r.date_to ? " – " + r.date_to : "" }}</td>
                    <td>{{ r.pax_or_qty || "" }}</td>
                    <td>{{ r.location || "" }}</td>
                    <td><span class="fjk-status" :class="statusClass(r.status)"><span v-if="statusCue(r.status)" class="fjk-cue">{{ statusCue(r.status) }}</span>{{ r.status || "—" }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 5. Activities / Tickets -->
            <div class="mt-3 font-medium">Activities / Tickets</div>
            <span v-if="!(summary.activity_items || []).length" class="text-gray-500">None recorded.</span>
            <table v-else class="w-full border-collapse">
              <thead>
                <tr>
                  <th align="left">Item</th><th align="left">Qty</th><th align="left">Date/Time</th>
                  <th align="left">Pax/Coverage</th><th align="left">Status</th><th align="left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in summary.activity_items || []" :key="a.item" class="border-t border-gray-100">
                  <td>{{ a.item }}</td>
                  <td>{{ a.quantity || "" }}</td>
                  <td>{{ a.date_time || "" }}</td>
                  <td>{{ a.pax_or_coverage || "" }}</td>
                  <td><span class="fjk-status" :class="statusClass(a.status)"><span v-if="statusCue(a.status)" class="fjk-cue">{{ statusCue(a.status) }}</span>{{ a.status || "—" }}</span></td>
                  <td>{{ a.notes || "" }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 6. Guide -->
            <div class="mt-3 font-medium">Guide</div>
            <span v-if="!(summary.guide_requirements || []).length" class="text-gray-500">None recorded.</span>
            <table v-else class="w-full border-collapse">
              <thead>
                <tr>
                  <th align="left">Languages</th><th align="left">Dates</th><th align="left">Duration</th>
                  <th align="left">Location</th><th align="left">Pax</th><th align="left">Scope</th>
                  <th align="left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="g in summary.guide_requirements || []"
                  :key="(g.languages || '') + (g.date_from || '')"
                  class="border-t border-gray-100"
                >
                  <td>{{ g.languages || "" }}</td>
                  <td>{{ g.date_from || "" }}{{ g.date_to ? " – " + g.date_to : "" }}</td>
                  <td>{{ g.duration || "" }}</td>
                  <td>{{ g.location || "" }}</td>
                  <td>{{ g.pax || "" }}</td>
                  <td>{{ g.coverage_scope || "" }}</td>
                  <td><span class="fjk-status" :class="statusClass(g.status)"><span v-if="statusCue(g.status)" class="fjk-cue">{{ statusCue(g.status) }}</span>{{ g.status || "—" }}</span></td>
                </tr>
              </tbody>
            </table>

            <!-- (Day-by-Day primary-domain detail is rendered above; no duplicate here.) -->

            <!-- 8. Information Status / Readiness (consolidated; same model as Summary) -->
            <div class="mt-3 font-medium">Information Status / Readiness</div>
            <div class="mt-1">
              Ready to proceed: <b>{{ summary.ready_for_quotation ? "Yes" : "Not yet" }}</b>
              <span class="text-gray-500"> (advisory)</span>
            </div>
            <div class="mt-1">
              To confirm: <b>{{ outstanding.to_confirm.length }}</b> · Missing:
              <b>{{ outstanding.missing.length }}</b>
            </div>
            <ul class="ml-4 list-disc">
              <li v-for="m in outstanding.missing" :key="'dm' + m.area + m.item">
                <span class="fjk-status fjk-st-missing"><span class="fjk-cue">!</span>MISSING</span> — {{ m.area }}{{ m.domain ? " / " + m.domain : "" }}: {{ m.item }}
              </li>
              <li v-for="t in outstanding.to_confirm" :key="'dt' + t.area + t.item">
                <span class="fjk-status fjk-st-confirm"><span class="fjk-cue">?</span>TO CONFIRM</span> — {{ t.area }}{{ t.domain ? " / " + t.domain : "" }}: {{ t.item }}
              </li>
            </ul>

            <!-- Source evidence -->
            <div class="mt-3 font-medium">Source evidence</div>
            <ul class="ml-4 list-disc">
              <li v-for="f in summary.evidence || []" :key="f.name">
                <a :href="f.file_url" target="_blank" rel="noopener">{{ f.file_name }}</a>
              </li>
            </ul>
            <div v-if="!(summary.evidence || []).length" class="text-gray-500">No attachments.</div>
          </div>
          <div v-else class="mt-2 text-gray-500">Loading…</div>
        </section>
      </template>

      <!-- SUPPLIER QUOTATION -->
      <template v-else>
        <section v-if="!(summary && summary.info_complete)" class="border border-gray-200 rounded-lg p-3 mb-3">
          <b>Supplier Quotation — Inactive</b>
          <div class="mt-2 text-gray-500">
            Information Gathering must be completed first. Mark <b>Info Complete</b> in the Summary tab to
            activate this workflow.
          </div>
        </section>
        <template v-else>
          <section class="border border-gray-200 rounded-lg p-3 mb-3">
            <b>Supplier Quotation</b>
            <div class="mt-2 text-gray-500">
              Supplier Quotation workflow is not yet implemented. The area below is the existing quotation
              prototype retained for continuity.
            </div>
          </section>

          <section class="border border-gray-200 rounded-lg p-3 mb-3">
            <b>Quotation &amp; version history</b>
            <div class="mt-2" v-if="!quotation">
              <Button variant="solid" label="Create quotation" @click="createQuotation" />
            </div>
            <div v-else>
              <div>
                Quotation: <b>{{ quotation }}</b>
                <span v-if="activeConfirmed"> · active confirmed: <b>{{ activeConfirmed }}</b></span>
              </div>
              <table class="w-full mt-2 border-collapse">
                <thead>
                  <tr>
                    <th align="left">Version</th><th align="left">No</th><th align="left">State</th>
                    <th align="left">Total</th><th align="left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="v in versions" :key="v.name" class="border-t border-gray-100">
                    <td>{{ v.name }}</td>
                    <td>{{ v.version_no || "—" }}</td>
                    <td>{{ v.derived_state }}</td>
                    <td>{{ v.final_total || "" }}</td>
                    <td>
                      <Button v-if="v.docstatus === 0" label="Submit" @click="submitVersion(v.name)" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex gap-2 mt-2">
                <select v-model="newVersion.change_type">
                  <option>Price</option><option>Add</option><option>Remove</option>
                  <option>Requirement change</option><option>Terms</option>
                </select>
                <input v-model="newVersion.negotiation_note" placeholder="negotiation note" class="flex-1" />
                <input v-model="newVersion.supplier_requote_ref" placeholder="supplier re-quote ref" />
                <Button label="Create V" @click="createVersion" />
              </div>
            </div>
          </section>

          <section class="border border-gray-200 rounded-lg p-3 mb-3">
            <b>Negotiation</b>
            <div class="flex gap-2 mt-2" v-if="quotation">
              <select v-model="negotiate.change_type">
                <option>Price</option><option>Add</option><option>Remove</option>
                <option>Requirement change</option><option>Terms</option>
              </select>
              <select v-model="negotiate.source">
                <option>Customer</option><option>Operator</option><option>Supplier</option>
              </select>
              <input v-model="negotiate.description" placeholder="description" class="flex-1" />
              <Button label="Add entry" @click="addNegotiation" />
            </div>
            <div v-else class="text-gray-500 mt-1.5">Create a quotation first.</div>
          </section>

          <section class="border border-gray-200 rounded-lg p-3">
            <b>Confirm definitive quotation + evidence</b>
            <div class="flex gap-2 mt-2 items-center" v-if="quotation">
              <select v-model="confirm.version">
                <option v-for="v in submittedVersions" :key="v.name" :value="v.name">
                  {{ v.name }} (V{{ v.version_no }})
                </option>
              </select>
              <select v-model="confirm.source">
                <option>Email</option><option>WhatsApp</option><option>Other</option>
              </select>
              <input type="file" @change="onEvidence" />
              <Button variant="solid" label="Mark CONFIRMED" :disabled="!canConfirm" @click="confirmVersion" />
            </div>
            <div v-else class="text-gray-500 mt-1.5">Create and submit a version first.</div>
          </section>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import { Button } from "@fjk/ui/components/Button";

function csrf() {
  return (window.frappe && frappe.csrf_token) || "";
}

async function api(method, args) {
  const res = await fetch("/api/method/" + method, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": csrf(),
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(args || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && data._server_messages) || (data && data.exception) || res.statusText;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return data.message;
}

async function uploadEvidence(file) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("is_private", "0");
  const res = await fetch("/api/method/upload_file", {
    method: "POST",
    headers: { "X-Frappe-CSRF-Token": csrf() },
    credentials: "same-origin",
    body: fd,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("Evidence upload failed");
  return data.message.file_url;
}

const deal = ref("");
const ctx = ref(null);
const readiness = ref(null);
const summary = ref(null);
const allocations = ref(null);
const tab = ref("summary");
const quotation = ref("");
const versions = ref([]);
const activeConfirmed = ref("");
const error = ref("");
const busy = ref(false);
const newVersion = reactive({ change_type: "Price", negotiation_note: "", supplier_requote_ref: "" });
const negotiate = reactive({ change_type: "Price", description: "", source: "Customer" });
const confirm = reactive({ version: "", source: "Email", evidence: "" });
let evidenceFile = null;

const submittedVersions = computed(() => versions.value.filter((v) => v.docstatus === 1));
const canConfirm = computed(() => !!confirm.version && !!confirm.evidence && !!confirm.source);

// DG-1: prominent derived presentation title using existing data only.
// Native CRM Deal identifier/series is unchanged; exact token format is presentational.
const derivedTitle = computed(() => {
  const org = (summary.value && summary.value.organization) || (ctx.value && ctx.value.organization) || "";
  const m = (deal.value || "").match(/(\d{4})-(\d+)$/);
  const parts = [org, m ? m[1] : "", m ? "#" + m[2] : ""].filter(Boolean);
  return parts.join(" · ");
});

// Existing shared D1 fields (raw keys) surfaced by get_deal_summary.
const shared = computed(() => (summary.value && summary.value.shared) || {});

const travel = computed(() => {
  const s = shared.value;
  return {
    destination: s.fjk_destination_route || "—",
    dates: s.fjk_exact_dates || s.fjk_timeframe || "—",
    duration: s.fjk_duration || "—",
  };
});

function fmtPax(n, singular, plural) {
  return n + " " + (n === 1 ? singular : plural);
}

const paxComposition = computed(() => {
  const s = shared.value;
  const bits = [];
  if (s.fjk_total_pax) bits.push(s.fjk_total_pax + " pax");
  const b = [];
  if (s.fjk_adults) b.push(fmtPax(s.fjk_adults, "adult", "adults"));
  if (s.fjk_children) b.push(fmtPax(s.fjk_children, "child", "children"));
  if (s.fjk_infants) b.push(fmtPax(s.fjk_infants, "infant", "infants"));
  if (b.length) bits.push(b.join(", "));
  return bits.join(" · ") || "—";
});

// DG-5: derive scope from existing fjk_components only; no explicit scope field.
const requestedComponents = computed(() =>
  ((summary.value && summary.value.components) || []).filter((c) => c.requested),
);

const scopeLabel = computed(() => {
  const all = (summary.value && summary.value.components) || [];
  const req = requestedComponents.value;
  if (!req.length) return "—";
  const allRequested = all.length > 0 && all.every((c) => c.requested);
  // "Full package" only where safely derivable: every recorded component is requested
  // and there are at least three component types.
  if (allRequested && all.length >= 3) return "Full package";
  return req.map((c) => c.component).join(" + ");
});

// DG-4: business-category summaries (existing data only).
const summaryCategories = computed(() => {
  const s = summary.value;
  if (!s) return [];
  const byDomain = s.requirement_lines_by_domain || {};
  const dom = (name) =>
    (byDomain[name] || []).map((r) => ({
      text: r.item + (r.detail ? " — " + r.detail : ""),
      status: r.status,
    }));
  const cats = [
    { label: "Transportation", items: dom("Transportation") },
    { label: "Accommodation", items: dom("Accommodation") },
    { label: "Meals", items: dom("Meals") },
    {
      label: "Activities / Tickets",
      items: (s.activity_items || []).map((a) => ({
        text: a.item + (a.quantity ? " ×" + a.quantity : ""),
        status: a.status,
      })),
    },
    {
      label: "Guide",
      items: (s.guide_requirements || []).map((g) => ({
        text: (g.languages || "—") + (g.coverage_scope ? " — " + g.coverage_scope : ""),
        status: g.status,
      })),
    },
    { label: "Special Requirements", items: dom("Special Requirements") },
  ];
  ["Flights", "Other"].forEach((d) => {
    if ((byDomain[d] || []).length) cats.push({ label: d, items: dom(d) });
  });
  return cats;
});

// DG-6: consolidated Information Status (existing semantics; no new model).
const outstanding = computed(() => (summary.value && summary.value.outstanding) || { missing: [], to_confirm: [] });

const collectedItems = computed(() =>
  ((summary.value && summary.value.requirement_lines) || [])
    .filter((r) => r.status === "KNOWN")
    .map((r) => (r.domain ? r.domain + " / " : "") + r.item),
);

const customerConfirmedItems = computed(() => {
  const s = summary.value;
  if (!s) return [];
  const rows = [
    ...(s.requirement_lines || []).map((r) => ({ d: r.domain, i: r.item, st: r.status })),
    ...(s.guide_requirements || []).map((g) => ({ d: "Guide", i: g.languages, st: g.status })),
    ...(s.activity_items || []).map((a) => ({ d: "Activities", i: a.item, st: a.status })),
    ...(s.components || []).map((c) => ({ d: "Components", i: c.component, st: c.status })),
  ];
  return rows.filter((x) => x.st === "CUSTOMER-CONFIRMED").map((x) => (x.d ? x.d + " / " : "") + x.i);
});

// Candidate #4: Full Details grouped by business category (existing data only).
const SHARED_LABELS = {
  fjk_request_nature: "Request Nature",
  fjk_commercial_intent: "Commercial Intent",
  fjk_destination_route: "Destination / Route",
  fjk_timeframe: "Timeframe",
  fjk_exact_dates: "Exact Dates",
  fjk_duration: "Duration",
  fjk_total_pax: "Total Pax",
  fjk_adults: "Adults",
  fjk_children: "Children",
  fjk_infants: "Infants",
  fjk_trip_purpose: "Trip Purpose / Type",
  fjk_other_shared_context: "Other Shared Context",
  fjk_ready_for_quotation: "Ready for Quotation",
  fjk_info_complete: "Info Complete",
};

function fmtShared(v) {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return v;
}

function cint(v) {
  return v === true || v === 1 || v === "1" ? 1 : 0;
}

// HF-03: operator-facing readiness for the two Check fields (field-key-aware so
// passenger integers and other numeric values remain numeric).
function fmtFieldValue(key, v) {
  if (key === "fjk_ready_for_quotation") return cint(v) ? "Yes" : "Not yet";
  if (key === "fjk_info_complete") return cint(v) ? "Yes" : "No";
  return fmtShared(v);
}

// HF-04: status → visual class + non-colour cue (text status retained).
const STATUS_META = {
  MISSING: { cls: "fjk-st-missing", cue: "!" },
  "TO CONFIRM": { cls: "fjk-st-confirm", cue: "?" },
  "CUSTOMER-CONFIRMED": { cls: "fjk-st-confirmed", cue: "✓" },
  KNOWN: { cls: "fjk-st-known", cue: "" },
  "NOT APPLICABLE": { cls: "fjk-st-na", cue: "" },
};

function statusClass(s) {
  return (STATUS_META[s] && STATUS_META[s].cls) || "fjk-st-unknown";
}

function statusCue(s) {
  return (STATUS_META[s] && STATUS_META[s].cue) || "";
}

const sharedRows = computed(() =>
  Object.entries(shared.value).map(([k, v]) => ({ label: SHARED_LABELS[k] || k, value: fmtFieldValue(k, v) })),
);

const detailReqGroups = computed(() => {
  // Transportation / Accommodation / Meals are presented once in the Day-by-Day
  // primary domain sections; only non-primary domains remain here as a flat table.
  const by = (summary.value && summary.value.requirement_lines_by_domain) || {};
  const primary = ["Transportation", "Accommodation", "Meals"];
  const special = [];
  Object.keys(by).forEach((d) => {
    if (!primary.includes(d)) special.push(...by[d]);
  });
  return [{ domain: "Special / Other Requirements", rows: special }];
});

// Full Details — Day-by-Day Domain Detail (presentation-only; existing requirement-line data).
function parseTripWindow() {
  const s = shared.value || {};
  const raw = [s.fjk_exact_dates, s.fjk_timeframe].filter(Boolean).join(" ");
  const dates = (raw.match(/\d{4}-\d{2}-\d{2}/g) || []).slice().sort();
  if (!dates.length) return null;
  return { start: dates[0], end: dates[dates.length - 1] };
}

const tripWindow = computed(parseTripWindow);

function daysBetween(a, b) {
  if (!a) return [];
  let lo = a;
  let hi = b || a;
  if (lo > hi) {
    const t = lo;
    lo = hi;
    hi = t;
  }
  const out = [];
  const d = new Date(lo + "T00:00:00Z");
  const e = new Date(hi + "T00:00:00Z");
  let guard = 0;
  while (d <= e && guard < 120) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
    guard += 1;
  }
  return out;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDateHuman(iso) {
  if (!iso || typeof iso !== "string") return iso || "—";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const mon = MONTHS[Number(m[2]) - 1] || m[2];
  return Number(m[3]) + " " + mon + " " + m[1];
}

const dayList = computed(() => {
  const win = tripWindow.value;
  return win ? daysBetween(win.start, win.end) : [];
});

const dayRangeAvailable = computed(() => dayList.value.length > 0);

function lineDays(r) {
  return r.date_from ? daysBetween(r.date_from, r.date_to) : [];
}

// Advisory: groups captured requirement lines by day within the trip window.
// Never asserts that a day requires a line, never invents records, never changes statuses.
function buildDomainBlock(domain) {
  const rows = ((summary.value && summary.value.requirement_lines_by_domain) || {})[domain] || [];
  const days = dayList.value;
  if (!days.length) {
    return { domain, rows, days: [], undated: [], outOfWindow: [] };
  }
  const dayObjs = days.map((date, i) => ({ day: i + 1, date, items: [] }));
  const byDate = {};
  dayObjs.forEach((d) => {
    byDate[d.date] = d;
  });
  const undated = [];
  const outOfWindow = [];
  rows.forEach((r) => {
    const ds = lineDays(r);
    if (!ds.length) {
      undated.push(r);
      return;
    }
    const within = ds.filter((x) => byDate[x]);
    if (!within.length) {
      outOfWindow.push(r);
      return;
    }
    within.forEach((x) => byDate[x].items.push(r));
  });
  return { domain, rows, days: dayObjs, undated, outOfWindow };
}

const dayDomainBlocks = computed(() =>
  ["Transportation", "Accommodation", "Meals"].map((d) => buildDomainBlock(d)),
);

const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner", "Other"];

function mealSlots(items) {
  const slots = MEAL_SLOTS.map((label) => ({ label, rows: [] }));
  items.forEach((m) => {
    const t = ((m.item || "") + " " + (m.detail || "")).toLowerCase();
    const idx = t.includes("breakfast") ? 0 : t.includes("lunch") ? 1 : t.includes("dinner") ? 2 : 3;
    slots[idx].rows.push(m);
  });
  return slots;
}

// FK-D12 allocation validation (read-only presentation; editing happens in CRM).
const ALLOC_STATE = {
  PASS: { cls: "fjk-st-confirmed", cue: "✓" },
  WARNING: { cls: "fjk-st-confirm", cue: "!" },
  ERROR: { cls: "fjk-st-missing", cue: "✕" },
  "NOT DETERMINABLE": { cls: "fjk-st-na", cue: "?" },
};

function allocStateClass(state) {
  return (ALLOC_STATE[state] && ALLOC_STATE[state].cls) || "fjk-st-unknown";
}

function allocStateCue(state) {
  return (ALLOC_STATE[state] && ALLOC_STATE[state].cue) || "";
}

const transportContexts = computed(() => (allocations.value && allocations.value.transportation) || []);
const accommodationContexts = computed(() => (allocations.value && allocations.value.accommodation) || []);

async function run(fn) {
  error.value = "";
  busy.value = true;
  try {
    await fn();
  } catch (e) {
    error.value = e && e.message ? e.message : String(e);
  } finally {
    busy.value = false;
  }
}

async function loadAll() {
  ctx.value = await api("feeljapank_crm.api.get_deal_context", { deal: deal.value });
  summary.value = await api("feeljapank_crm.api.get_deal_summary", { deal: deal.value });
  allocations.value = await api("feeljapank_crm.api.get_allocation_validation", { deal: deal.value });
  readiness.value = await api("feeljapank_crm.api.get_readiness", { deal: deal.value });
  const q = await api("feeljapank_crm.api.get_quotation", { deal: deal.value });
  quotation.value = q.quotation || "";
  if (quotation.value) await loadHistory();
}

async function loadHistory() {
  if (!quotation.value) {
    versions.value = [];
    activeConfirmed.value = "";
    return;
  }
  const h = await api("feeljapank_crm.api.get_version_history", { quotation: quotation.value });
  versions.value = h.versions || [];
  activeConfirmed.value = h.active_confirmed_version || "";
  if (!confirm.version) {
    const latest = submittedVersions.value[submittedVersions.value.length - 1];
    if (latest) confirm.version = latest.name;
  }
}

async function createQuotation() {
  await run(async () => {
    const r = await api("feeljapank_crm.api.create_quotation", { deal: deal.value });
    quotation.value = r.quotation;
    await loadHistory();
  });
}

async function createVersion() {
  await run(async () => {
    if (!quotation.value) await createQuotation();
    await api("feeljapank_crm.api.create_version", {
      quotation: quotation.value,
      change_type: newVersion.change_type,
      negotiation_note: newVersion.negotiation_note,
      supplier_requote_ref: newVersion.supplier_requote_ref,
    });
    newVersion.negotiation_note = "";
    newVersion.supplier_requote_ref = "";
    await loadHistory();
  });
}

async function submitVersion(name) {
  await run(async () => {
    await api("feeljapank_crm.api.submit_version", { name });
    await loadHistory();
  });
}

async function addNegotiation() {
  await run(async () => {
    await api("feeljapank_crm.api.add_negotiation_entry", {
      quotation: quotation.value,
      change_type: negotiate.change_type,
      description: negotiate.description,
      source: negotiate.source,
      quotation_version: confirm.version || null,
    });
    negotiate.description = "";
  });
}

function onEvidence(ev) {
  const f = ev.target.files && ev.target.files[0];
  evidenceFile = f || null;
  confirm.evidence = f ? f.name : "";
}

async function confirmVersion() {
  await run(async () => {
    let url = confirm.evidence;
    if (evidenceFile) url = await uploadEvidence(evidenceFile);
    await api("feeljapank_crm.api.confirm_version", {
      quotation: quotation.value,
      version: confirm.version,
      source: confirm.source,
      evidence: url,
    });
    await loadHistory();
  });
}

function openInCRM() {
  window.open("/crm/deals/" + encodeURIComponent(deal.value), "_blank");
}

async function setInfoComplete(value) {
  await run(async () => {
    await api("feeljapank_crm.api.set_info_complete", { deal: deal.value, value });
    summary.value = await api("feeljapank_crm.api.get_deal_summary", { deal: deal.value });
    ctx.value = await api("feeljapank_crm.api.get_deal_context", { deal: deal.value });
  });
}

function onVisibility() {
  if (!document.hidden && deal.value) run(loadAll);
}

onMounted(() => {
  const u = new URL(window.location.href);
  deal.value =
    u.searchParams.get("deal") ||
    (window.frappe && frappe.route_options && frappe.route_options.deal) ||
    "";
  if (deal.value) run(loadAll);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("focus", onVisibility);
});

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", onVisibility);
  window.removeEventListener("focus", onVisibility);
});
</script>

<style scoped>
.fjk-sticky {
  position: sticky;
  top: calc(var(--navbar-height, 0px) + var(--page-head-height, 60px));
  z-index: 6;
  background: var(--fg-color, #ffffff);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}
.fjk-status {
  display: inline-block;
  padding: 0 6px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.fjk-cue {
  font-weight: 800;
  margin-right: 4px;
}
.fjk-st-missing { color: #b91c1c; background: #fee2e2; border-color: #fecaca; }
.fjk-st-confirm { color: #92400e; background: #fef3c7; border-color: #fde68a; }
.fjk-st-confirmed { color: #166534; background: #dcfce7; border-color: #bbf7d0; }
.fjk-st-known { color: #374151; background: #f3f4f6; border-color: #e5e7eb; }
.fjk-st-na { color: #6b7280; background: transparent; border-color: #e5e7eb; font-style: italic; }
.fjk-st-unknown { color: #6b7280; }
</style>
