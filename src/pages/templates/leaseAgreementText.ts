import type { LeaseFormData } from './leaseTypes'

const or = (val: string | undefined, fallback: string) => (val?.trim() ? val.trim() : fallback)

export function generateLeaseHTML(data: LeaseFormData, lang: 'en' | 'es'): string {
  const f = (k: keyof LeaseFormData) => or(data[k] as string, '_______________')
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const utilsList: string[] = []
  const utilsListEs: string[] = []
  if (data.utilitiesWater) { utilsList.push('Water'); utilsListEs.push('Agua') }
  if (data.utilitiesElectric) { utilsList.push('Electric'); utilsListEs.push('Electricidad') }
  if (data.utilitiesGas) { utilsList.push('Gas'); utilsListEs.push('Gas') }
  if (data.utilitiesTrash) { utilsList.push('Trash'); utilsListEs.push('Basura') }
  if (data.utilitiesInternet) { utilsList.push('Internet'); utilsListEs.push('Internet') }
  const utilitiesText = utilsList.length > 0 ? utilsList.join(', ') : 'None'
  const utilitiesTextEs = utilsListEs.length > 0 ? utilsListEs.join(', ') : 'Ninguno'

  if (lang === 'es') return generateSpanish(data, f, today, utilitiesTextEs)
  return generateEnglish(data, f, today, utilitiesText)
}

function generateEnglish(data: LeaseFormData, f: (k: keyof LeaseFormData) => string, today: string, utilitiesText: string): string {
  const isFixed = data.leaseType === 'fixed'
  const serviceOnly = data.petPolicy === 'service-only'
  const noPets = data.petPolicy === 'no-pets'
  const tenantMaint = data.maintenanceResponsibility === 'tenant-minor'
  const parkingFee = data.parking === 'additional-fee'
  const parkingNone = data.parking === 'not-included'

  const unitStr = data.unitNumber ? `, Unit ${data.unitNumber}` : ''
  const propertyFull = `${f('propertyAddress')}${unitStr}`

  return `
<div class="agreement-body">

<div class="agreement-title">RESIDENTIAL LEASE AGREEMENT</div>
<div class="agreement-subtitle">${isFixed ? 'Fixed-Term Lease' : 'Month-to-Month Rental Agreement'}</div>
<div class="agreement-date">Date: ${today}</div>

<p>This Residential Lease Agreement ("Agreement" or "Lease") is entered into as of <strong>${f('leaseStartDate')}</strong>, by and between:</p>

<div class="parties-block">
  <div class="party">
    <strong>LANDLORD:</strong><br/>
    ${f('landlordName')}<br/>
    ${f('landlordAddress')}<br/>
    Phone: ${f('landlordPhone')} | Email: ${f('landlordEmail')}
  </div>
  <div class="party">
    <strong>TENANT:</strong><br/>
    ${f('tenantName')}<br/>
    Phone: ${f('tenantPhone')} | Email: ${f('tenantEmail')}
  </div>
</div>

<h2>1. PREMISES</h2>
<p>Landlord hereby leases to Tenant the residential premises located at <strong>${propertyFull}</strong> ("Premises"), State of ${f('governingState')}, for residential use only. Tenant shall not use the Premises for any commercial, business, or unlawful purpose. The maximum number of occupants permitted to reside in the Premises is <strong>${f('maxOccupants')}</strong>.</p>

<h2>2. LEASE TERM</h2>
${isFixed ? `
<p>This is a fixed-term lease. The tenancy shall commence on <strong>${f('leaseStartDate')}</strong> and shall terminate on <strong>${f('leaseEndDate')}</strong> ("Expiration Date"), unless sooner terminated or extended in accordance with this Agreement. Upon the Expiration Date, this Lease shall not automatically renew unless both parties execute a written renewal agreement prior to the Expiration Date. If Tenant remains in possession of the Premises after the Expiration Date without a written renewal, such occupancy shall be deemed a month-to-month tenancy, subject to all terms of this Lease, and may be terminated by either party upon providing <strong>${f('noticeToVacateDays')} days</strong>' written notice to the other party.</p>
` : `
<p>This is a month-to-month tenancy. The tenancy shall commence on <strong>${f('leaseStartDate')}</strong> and shall continue on a month-to-month basis until terminated. Either party may terminate this Agreement by providing <strong>${f('noticeToVacateDays')} days</strong>' prior written notice to the other party.</p>
`}

<h2>3. RENT</h2>
<p>Tenant agrees to pay Landlord a monthly rent of <strong>$${f('monthlyRent')}</strong>, due on the <strong>${f('rentDueDay')}</strong> day of each calendar month. Rent shall be paid in lawful money of the United States. Payment shall be made by check, electronic transfer, or such other method as Landlord may specify in writing. Rent shall be paid without demand, deduction, or offset, unless expressly permitted by applicable law.</p>

<h2>4. LATE FEES</h2>
<p>If rent is not received by Landlord within <strong>${f('lateFeeGraceDays')} days</strong> after the due date, Tenant shall pay a late fee of <strong>$${f('lateFeeAmount')}</strong>. The late fee is in addition to, and not in lieu of, the overdue rent and shall not be construed as a waiver of any default. Acceptance of rent with a late fee shall not constitute a waiver of Landlord's right to enforce any other provision of this Agreement.</p>

<h2>5. SECURITY DEPOSIT</h2>
<p>Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of <strong>$${f('securityDeposit')}</strong> as a security deposit ("Security Deposit"). The Security Deposit shall be held by Landlord as security for the faithful performance by Tenant of all terms and conditions of this Lease.</p>
<p>The Security Deposit shall not be applied by Tenant as last month's rent. Upon termination of this Lease, Landlord shall return the Security Deposit to Tenant, less any amounts properly deducted for: (a) unpaid rent; (b) damage to the Premises beyond normal wear and tear; (c) cleaning charges if Premises are returned in a condition materially dirtier than at move-in; or (d) any other amounts owed by Tenant under this Lease. Landlord shall return the Security Deposit (and an itemized written statement of any deductions) within the time period required by the laws of the State of ${f('governingState')}.</p>

<h2>6. UTILITIES AND SERVICES</h2>
<p>The following utilities and services are included in the monthly rent: <strong>${utilitiesText}</strong>. All other utilities and services not listed above shall be the sole responsibility of Tenant and shall be placed in Tenant's name prior to occupancy. Tenant shall pay all such utilities timely and shall not allow any utility service to be disconnected for non-payment.</p>

<h2>7. PARKING</h2>
${parkingNone
  ? `<p>Parking is <strong>not included</strong> with this Lease. Tenant is responsible for making independent arrangements for parking and shall not park on the Premises or in any designated Premises parking area without prior written approval from Landlord.</p>`
  : parkingFee
  ? `<p>Parking is available for an additional fee of <strong>$${f('parkingFee')}</strong> per month, payable on the same day as rent. Parking is subject to availability and may be terminated upon 30 days' written notice from Landlord.</p>`
  : `<p>One (1) designated parking space is included with this Lease at no additional charge. Tenant shall use only the designated space and shall not park in spaces designated for other tenants or residents. Additional vehicles must be approved in writing by Landlord.</p>`
}

<h2>8. PET POLICY</h2>
${noPets
  ? `<p><strong>NO PETS PERMITTED.</strong> Tenant shall not keep, harbor, or permit any animal, bird, reptile, or other pet on the Premises. Violation of this provision shall constitute grounds for termination of this Lease.</p>`
  : serviceOnly
  ? `<p>Pets are generally not permitted on the Premises. However, Tenant may keep service animals or emotional support animals as required by applicable law, provided Tenant furnishes Landlord with appropriate documentation. Tenant shall be liable for any damage caused by any such animal.</p>`
  : `<p>Pets are permitted on the Premises subject to the following conditions: (a) Tenant shall pay a non-refundable pet deposit of <strong>$${f('petDeposit')}</strong> prior to bringing any pet onto the Premises; (b) Tenant shall not keep any pet that creates a nuisance, causes damage, or disturbs other residents; (c) Tenant is solely responsible for any damage caused by pets; and (d) Landlord reserves the right to revoke pet privileges upon 30 days' written notice if pets become a nuisance or cause damage.</p>`
}

<h2>9. MAINTENANCE AND REPAIRS</h2>
${tenantMaint
  ? `<p>Tenant shall be responsible for all minor repairs and maintenance costing less than <strong>$${f('tenantMaintenanceLimit')}</strong>. For repairs costing $${f('tenantMaintenanceLimit')} or more, Tenant shall promptly notify Landlord in writing, and Landlord shall arrange for such repairs within a reasonable time. Tenant shall maintain the Premises in a clean and sanitary condition and shall not commit or permit any waste or nuisance.</p>`
  : `<p>Landlord shall be responsible for maintaining the Premises in habitable condition and shall make all necessary repairs in a reasonable time after written notification by Tenant. Tenant shall promptly report any need for repairs to Landlord in writing. Tenant shall maintain the Premises in a clean and sanitary condition and shall be liable for damage caused by Tenant's misuse or neglect.</p>`
}
<p>Tenant shall not make any alterations, additions, or improvements to the Premises without Landlord's prior written consent. Any approved alterations shall become property of Landlord upon termination of this Lease, unless Landlord directs Tenant to remove same and restore the Premises to its original condition.</p>

<h2>10. LANDLORD'S RIGHT OF ENTRY</h2>
<p>Landlord and Landlord's authorized agents shall have the right to enter the Premises at any reasonable time, after providing at least <strong>24 hours' advance written notice</strong> to Tenant, for the purpose of: (a) making necessary or agreed repairs, decorations, alterations, or improvements; (b) supplying necessary or agreed services; (c) showing the Premises to prospective tenants, purchasers, or lenders; or (d) making inspections required by law. In the case of an emergency (including but not limited to fire, flood, gas leak, or security breach), Landlord may enter the Premises without advance notice.</p>

<h2>11. SUBLETTING AND ASSIGNMENT</h2>
<p>Tenant shall not sublet the Premises or any portion thereof, nor assign this Lease or any interest therein, without the prior written consent of Landlord, which consent may be withheld at Landlord's sole discretion. Any unauthorized subletting or assignment shall be void and shall constitute grounds for immediate termination of this Lease.</p>

<h2>12. PROPERTY RULES AND CONDUCT</h2>
<p>Tenant agrees to: (a) not disturb the quiet enjoyment of neighbors or other residents; (b) dispose of all garbage and trash in designated receptacles; (c) comply with all applicable laws, ordinances, health codes, and building rules; (d) not engage in, or permit, any illegal activity on the Premises; (e) not use the Premises for any purpose other than residential occupancy; and (f) comply with any written rules or regulations provided by Landlord, which may be amended upon reasonable written notice to Tenant.</p>

<h2>13. DEFAULT AND EVICTION</h2>
<p>Each of the following shall constitute an event of default by Tenant:</p>
<ul>
  <li>Failure to pay rent or any other sum due under this Lease when due;</li>
  <li>Violation of any term or condition of this Lease that remains uncured for <strong>3 days</strong> after written notice from Landlord (or such longer cure period as may be required by applicable law);</li>
  <li>Unauthorized subletting, assignment, or occupancy by unauthorized persons;</li>
  <li>Material damage to the Premises;</li>
  <li>Any illegal activity on or about the Premises.</li>
</ul>
<p>Upon an event of default, Landlord may, to the extent permitted by applicable law, terminate this Lease upon proper written notice and pursue all available remedies, including eviction proceedings. Tenant shall be liable for all costs and reasonable attorneys' fees incurred by Landlord in enforcing this Lease.</p>

<h2>14. EARLY TERMINATION</h2>
<p>If Tenant vacates the Premises before the end of the Lease term (in the case of a fixed-term lease), Tenant shall pay Landlord an early termination fee of <strong>$${f('earlyTerminationFee')}</strong>, in addition to all rent due through the date of vacating. Payment of the early termination fee shall not release Tenant from liability for unpaid rent. Landlord shall use reasonable efforts to re-rent the Premises to mitigate damages.</p>

<h2>15. NOTICE TO VACATE</h2>
<p>Tenant shall provide Landlord with at least <strong>${f('noticeToVacateDays')} days</strong>' prior written notice before vacating the Premises. Failure to provide proper notice shall result in Tenant being liable for rent through the end of the notice period, regardless of when Tenant actually vacates.</p>

<h2>16. RENEWAL TERMS</h2>
${isFixed
  ? `<p>This Lease shall not automatically renew upon the Expiration Date. If both parties wish to renew this Lease, they must execute a written renewal agreement prior to the Expiration Date. The renewal terms, including rent, shall be mutually agreed upon in writing. Landlord shall provide Tenant with at least 60 days' advance written notice of any material changes to the terms of any proposed renewal.</p>`
  : `<p>This month-to-month tenancy shall continue until terminated as provided in Section 2. Landlord reserves the right to modify any term of this Agreement, including the monthly rent, upon providing Tenant with at least 30 days' advance written notice of such change.</p>`
}

<h2>17. SURRENDER OF PREMISES</h2>
<p>Upon termination of this Lease, Tenant shall vacate and surrender the Premises to Landlord in the same condition as received, ordinary wear and tear excepted. Tenant shall remove all personal property and properly dispose of all garbage. Tenant shall return all keys and access devices to Landlord. If Tenant fails to remove personal property upon surrender, Landlord may dispose of such property in accordance with applicable law.</p>

<h2>18. GOVERNING LAW</h2>
<p>This Lease shall be governed by and construed in accordance with the laws of the State of <strong>${f('governingState')}</strong>. Any dispute arising under this Lease shall be resolved in the appropriate courts of ${f('governingState')}. The prevailing party in any such proceeding shall be entitled to recover reasonable attorneys' fees and costs.</p>

<h2>19. ENTIRE AGREEMENT; AMENDMENTS</h2>
<p>This Lease constitutes the entire agreement between the parties with respect to the rental of the Premises and supersedes all prior oral or written agreements. This Lease may not be modified except by a written instrument signed by both parties.</p>

<h2>20. SEVERABILITY</h2>
<p>If any provision of this Lease is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>

<div class="signature-block">
  <h2>SIGNATURES</h2>
  <p>By signing below, both parties acknowledge they have read and understood this Lease Agreement and agree to be bound by its terms and conditions.</p>

  <div class="sig-grid">
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>LANDLORD:</strong> ${f('landlordName')}</p>
      <p>Date: ___________________________</p>
      <p>Print Name: ___________________________</p>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>TENANT:</strong> ${f('tenantName')}</p>
      <p>Date: ___________________________</p>
      <p>Print Name: ___________________________</p>
    </div>
  </div>

  <div class="notary-block">
    <h3>MOVE-IN CHECKLIST ACKNOWLEDGMENT</h3>
    <p>Tenant acknowledges receipt of a move-in checklist and confirms that the condition of the Premises has been documented prior to occupancy. Tenant agrees to complete and return the signed checklist to Landlord within <strong>3 days</strong> of move-in.</p>
    <br/>
    <div class="sig-line" style="width:300px;"></div>
    <p>Tenant Initials: _______  Date: ___________________________</p>
  </div>
</div>

<div class="disclaimer-block">
  <strong>DISCLAIMER:</strong> This template is for educational purposes only. It is not a substitute for legal advice. Have all agreements reviewed by a licensed attorney in your state before signing.
</div>

</div>
`
}

function generateSpanish(data: LeaseFormData, f: (k: keyof LeaseFormData) => string, today: string, utilitiesText: string): string {
  const isFixed = data.leaseType === 'fixed'
  const serviceOnly = data.petPolicy === 'service-only'
  const noPets = data.petPolicy === 'no-pets'
  const tenantMaint = data.maintenanceResponsibility === 'tenant-minor'
  const parkingFee = data.parking === 'additional-fee'
  const parkingNone = data.parking === 'not-included'

  const unitStr = data.unitNumber ? `, Unidad ${data.unitNumber}` : ''
  const propertyFull = `${f('propertyAddress')}${unitStr}`

  return `
<div class="agreement-body">

<div class="agreement-title">CONTRATO DE ARRENDAMIENTO RESIDENCIAL</div>
<div class="agreement-subtitle">${isFixed ? 'Arrendamiento a Plazo Fijo' : 'Contrato de Arrendamiento Mes a Mes'}</div>
<div class="agreement-date">Fecha: ${today}</div>

<p>Este Contrato de Arrendamiento Residencial ("Contrato") es celebrado a partir del <strong>${f('leaseStartDate')}</strong>, entre:</p>

<div class="parties-block">
  <div class="party">
    <strong>ARRENDADOR:</strong><br/>
    ${f('landlordName')}<br/>
    ${f('landlordAddress')}<br/>
    Teléfono: ${f('landlordPhone')} | Correo: ${f('landlordEmail')}
  </div>
  <div class="party">
    <strong>ARRENDATARIO:</strong><br/>
    ${f('tenantName')}<br/>
    Teléfono: ${f('tenantPhone')} | Correo: ${f('tenantEmail')}
  </div>
</div>

<h2>1. INMUEBLE</h2>
<p>El Arrendador da en arrendamiento al Arrendatario el inmueble residencial ubicado en <strong>${propertyFull}</strong>, Estado de ${f('governingState')}, exclusivamente para uso habitacional. El número máximo de ocupantes permitidos es de <strong>${f('maxOccupants')}</strong>.</p>

<h2>2. VIGENCIA DEL CONTRATO</h2>
${isFixed ? `
<p>Este es un arrendamiento a plazo fijo. La vigencia comenzará el <strong>${f('leaseStartDate')}</strong> y concluirá el <strong>${f('leaseEndDate')}</strong> ("Fecha de Vencimiento"), salvo terminación anticipada o prórroga de conformidad con este Contrato. Si el Arrendatario permanece en posesión del inmueble después de la Fecha de Vencimiento sin un acuerdo de renovación escrito, dicha ocupación se considerará un arrendamiento mes a mes y podrá ser terminado por cualquiera de las partes mediante aviso escrito con <strong>${f('noticeToVacateDays')} días</strong> de anticipación.</p>
` : `
<p>Este es un arrendamiento mes a mes. La vigencia comenzará el <strong>${f('leaseStartDate')}</strong> y continuará de mes en mes hasta su terminación. Cualquiera de las partes podrá terminar este Contrato mediante aviso escrito con <strong>${f('noticeToVacateDays')} días</strong> de anticipación.</p>
`}

<h2>3. RENTA</h2>
<p>El Arrendatario se compromete a pagar al Arrendador una renta mensual de <strong>$${f('monthlyRent')}</strong>, con vencimiento el día <strong>${f('rentDueDay')}</strong> de cada mes calendario. El pago deberá realizarse en moneda de curso legal, sin deducciones ni compensaciones, salvo lo expresamente permitido por la ley aplicable.</p>

<h2>4. CARGOS POR MORA</h2>
<p>Si el Arrendador no recibe el pago de la renta dentro de los <strong>${f('lateFeeGraceDays')} días</strong> posteriores a la fecha de vencimiento, el Arrendatario pagará un cargo por mora de <strong>$${f('lateFeeAmount')}</strong>. Este cargo es adicional a la renta vencida y no constituye renuncia a ningún incumplimiento.</p>

<h2>5. DEPÓSITO EN GARANTÍA</h2>
<p>Al suscribir este Contrato, el Arrendatario entregará al Arrendador la cantidad de <strong>$${f('securityDeposit')}</strong> como depósito en garantía. Este depósito no podrá ser aplicado como último mes de renta. A la terminación del Contrato, el Arrendador devolverá el depósito, menos las deducciones procedentes por: (a) rentas vencidas; (b) daños al inmueble más allá del desgaste normal; (c) cargos de limpieza si corresponde; o (d) cualquier otro monto adeudado. El Arrendador devolverá el depósito y un estado de cuenta detallado dentro del plazo exigido por las leyes del Estado de ${f('governingState')}.</p>

<h2>6. SERVICIOS E INSTALACIONES</h2>
<p>Los siguientes servicios están incluidos en la renta mensual: <strong>${utilitiesText}</strong>. Todos los demás servicios serán responsabilidad exclusiva del Arrendatario y deberán contratarse a nombre del Arrendatario antes de la ocupación.</p>

<h2>7. ESTACIONAMIENTO</h2>
${parkingNone
  ? `<p>El estacionamiento <strong>no está incluido</strong> en este Contrato. El Arrendatario es responsable de sus propios arreglos de estacionamiento.</p>`
  : parkingFee
  ? `<p>El estacionamiento está disponible por un cargo adicional de <strong>$${f('parkingFee')}</strong> mensuales, pagaderos junto con la renta.</p>`
  : `<p>Se incluye un (1) lugar de estacionamiento designado sin costo adicional. El Arrendatario deberá utilizar únicamente el lugar asignado.</p>`
}

<h2>8. POLÍTICA DE MASCOTAS</h2>
${noPets
  ? `<p><strong>NO SE PERMITEN MASCOTAS.</strong> El Arrendatario no podrá tener, albergar ni permitir ningún animal en el inmueble. La violación de esta disposición constituirá causa de terminación de este Contrato.</p>`
  : serviceOnly
  ? `<p>En general no se permiten mascotas. Sin embargo, el Arrendatario podrá tener animales de servicio o de apoyo emocional conforme a la ley aplicable, previa presentación de la documentación correspondiente al Arrendador.</p>`
  : `<p>Se permiten mascotas sujeto a las siguientes condiciones: (a) el Arrendatario pagará un depósito por mascotas no reembolsable de <strong>$${f('petDeposit')}</strong>; (b) el Arrendatario es responsable de cualquier daño causado por las mascotas; (c) las mascotas no deberán causar molestias a vecinos ni daños al inmueble.</p>`
}

<h2>9. MANTENIMIENTO Y REPARACIONES</h2>
${tenantMaint
  ? `<p>El Arrendatario será responsable de todas las reparaciones y mantenimiento menores cuyo costo sea inferior a <strong>$${f('tenantMaintenanceLimit')}</strong>. Para reparaciones de mayor costo, el Arrendatario deberá notificar por escrito al Arrendador, quien realizará las reparaciones en un plazo razonable.</p>`
  : `<p>El Arrendador será responsable de mantener el inmueble en condiciones habitables y realizará todas las reparaciones necesarias dentro de un plazo razonable tras notificación escrita del Arrendatario. El Arrendatario será responsable de los daños causados por su descuido o mal uso.</p>`
}
<p>El Arrendatario no podrá realizar alteraciones, adiciones ni mejoras al inmueble sin el consentimiento previo y por escrito del Arrendador.</p>

<h2>10. DERECHO DE ACCESO DEL ARRENDADOR</h2>
<p>El Arrendador y sus representantes tendrán derecho de acceso al inmueble en horario razonable, previa notificación por escrito con al menos <strong>24 horas</strong> de anticipación, para realizar reparaciones, inspecciones, o mostrar el inmueble a posibles arrendatarios o compradores. En caso de emergencia, el Arrendador podrá ingresar sin aviso previo.</p>

<h2>11. SUBARRENDAMIENTO Y CESIÓN</h2>
<p>El Arrendatario no podrá subarrendar el inmueble ni ceder este Contrato sin el consentimiento previo y por escrito del Arrendador. Cualquier subarrendamiento o cesión no autorizado será nulo y constituirá causa de terminación inmediata del Contrato.</p>

<h2>12. REGLAMENTO Y CONDUCTA</h2>
<p>El Arrendatario se compromete a: (a) no perturbar la tranquilidad de vecinos; (b) disponer la basura en los contenedores designados; (c) cumplir con todas las leyes y ordenanzas aplicables; (d) no realizar actividades ilegales en el inmueble; y (e) cumplir con el reglamento escrito que el Arrendador pueda proporcionar.</p>

<h2>13. INCUMPLIMIENTO Y DESALOJO</h2>
<p>Constituirán eventos de incumplimiento por parte del Arrendatario:</p>
<ul>
  <li>No pagar la renta u otras sumas a su vencimiento;</li>
  <li>Violación de cualquier término del Contrato que no sea subsanada dentro de <strong>3 días</strong> después de notificación escrita (o el plazo mayor que exija la ley aplicable);</li>
  <li>Subarrendamiento, cesión u ocupación no autorizada;</li>
  <li>Daños materiales al inmueble;</li>
  <li>Cualquier actividad ilegal en el inmueble.</li>
</ul>
<p>Ante un evento de incumplimiento, el Arrendador podrá terminar este Contrato mediante aviso escrito y ejercer todos los recursos legales disponibles, incluyendo el desalojo. El Arrendatario será responsable de los honorarios razonables de abogado del Arrendador.</p>

<h2>14. TERMINACIÓN ANTICIPADA</h2>
<p>Si el Arrendatario desocupa el inmueble antes del vencimiento del plazo (en contratos a plazo fijo), deberá pagar al Arrendador una penalización por terminación anticipada de <strong>$${f('earlyTerminationFee')}</strong>, además de toda la renta adeudada hasta la fecha de desocupación.</p>

<h2>15. AVISO DE DESOCUPACIÓN</h2>
<p>El Arrendatario deberá notificar al Arrendador con al menos <strong>${f('noticeToVacateDays')} días</strong> de anticipación antes de desocupar el inmueble. La falta de aviso generará responsabilidad del Arrendatario por la renta del período de aviso completo.</p>

<h2>16. RENOVACIÓN</h2>
${isFixed
  ? `<p>Este Contrato no se renovará automáticamente al vencimiento. Si ambas partes desean renovarlo, deberán suscribir un acuerdo escrito de renovación antes de la Fecha de Vencimiento. El Arrendador notificará al Arrendatario con al menos 60 días de anticipación cualquier cambio en los términos de renovación.</p>`
  : `<p>Este arrendamiento mes a mes continuará hasta su terminación conforme a la Cláusula 2. El Arrendador podrá modificar los términos, incluyendo la renta, mediante aviso escrito con al menos 30 días de anticipación.</p>`
}

<h2>17. ENTREGA DEL INMUEBLE</h2>
<p>Al terminar este Contrato, el Arrendatario desocupará y entregará el inmueble al Arrendador en las mismas condiciones en que lo recibió, salvo el desgaste normal. El Arrendatario deberá retirar todos sus bienes y devolver todas las llaves y dispositivos de acceso.</p>

<h2>18. LEY APLICABLE</h2>
<p>Este Contrato se rige por las leyes del Estado de <strong>${f('governingState')}</strong>. Cualquier controversia se resolverá en los tribunales competentes de dicho Estado.</p>

<h2>19. ACUERDO COMPLETO; MODIFICACIONES</h2>
<p>Este Contrato constituye el acuerdo íntegro entre las partes respecto al arrendamiento del inmueble. Solo podrá modificarse mediante instrumento escrito firmado por ambas partes.</p>

<h2>20. DIVISIBILIDAD</h2>
<p>Si alguna disposición de este Contrato fuera declarada inválida, las demás disposiciones continuarán vigentes.</p>

<div class="signature-block">
  <h2>FIRMAS</h2>
  <p>Al firmar, ambas partes reconocen haber leído y comprendido este Contrato y aceptan estar obligados por sus términos y condiciones.</p>

  <div class="sig-grid">
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>ARRENDADOR:</strong> ${f('landlordName')}</p>
      <p>Fecha: ___________________________</p>
      <p>Nombre en letra de molde: ___________________________</p>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <p><strong>ARRENDATARIO:</strong> ${f('tenantName')}</p>
      <p>Fecha: ___________________________</p>
      <p>Nombre en letra de molde: ___________________________</p>
    </div>
  </div>

  <div class="notary-block">
    <h3>RECONOCIMIENTO DE LISTA DE VERIFICACIÓN DE ENTRADA</h3>
    <p>El Arrendatario acusa recibo de una lista de verificación de condiciones del inmueble al momento de la entrada y confirma que las condiciones han sido documentadas. El Arrendatario se compromete a completar y devolver la lista firmada al Arrendador dentro de los <strong>3 días</strong> siguientes a la mudanza.</p>
    <br/>
    <div class="sig-line" style="width:300px;"></div>
    <p>Iniciales del Arrendatario: _______  Fecha: ___________________________</p>
  </div>
</div>

<div class="disclaimer-block">
  <strong>AVISO LEGAL:</strong> Esta plantilla es solo para fines educativos. No sustituye el asesoramiento legal. Haga que todos los acuerdos sean revisados por un abogado con licencia en su estado antes de firmarlos.
</div>

</div>
`
}
