import React from 'react';

/**
 * This is a pure static html table copied from membership site: https://www.eclipse.org/membership/#tab-fees
 * **/

const MembershipFeeTable = () => {

    return (
      <>
        <div className="vertical-align margin-top-50">
          <table className="table table-stripped" cellSpacing="0">
            <thead>
                <tr>
                  <th width="40%" rowSpan="2">Annual Corporate Revenue
                  </th><th className="text-center" width="60%" colSpan="3">Annual Eclipse Foundation Membership Fees</th>
                </tr>
                <tr>
                  <th className="text-center" width="20%">Strategic</th>
                  <th className="text-center" width="20%">Contributing</th>
                  <th className="text-center" width="20%">Associate</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">&gt; €250&nbsp;million</td>
                <td>€250 000</td>
                <td>€20 000</td>
                <td>€5 000</td>
              </tr>
              <tr>
                <td className="text-left">€100&nbsp;million - €250&nbsp;million</td>
                <td>€150 000</td>
                <td>€15 000</td>
                <td>€5 000</td>
              </tr>
              <tr>
                <td className="text-left">€50&nbsp;million - €100&nbsp;million</td>
                <td>€100 000</td>
                <td>€10 000</td>
                <td>€5 000</td>
              </tr>
              <tr>
                <td className="text-left">€10&nbsp;million - €50&nbsp;million</td>
                <td>€50 000</td>
                <td>€7 500</td>
                <td>€5 000</td>
              </tr>
              <tr>
                <td className="text-left">&lt; €10&nbsp;million</td>
                <td>€25 000</td>
                <td>€5 000</td>
                <td>€5 000</td>
              </tr>
              <tr>
                <td className="text-left">&lt; €1&nbsp;million &lt; 10 employees</td>
                <td>€25 000</td>
                <td>€1 500</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td className="text-left">Govt, Govt agencies, Research Organizations, NGOs, etc.</td>
                <td>€25 000</td>
                <td>€5 000</td>
                <td>€0</td>
              </tr>
              <tr>
                <td className="text-left">Academic, Publishing Organizations, User Groups, etc.</td>
                <td>€25 000</td>
                <td>€1 000</td>
                <td>€0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
}

export default MembershipFeeTable