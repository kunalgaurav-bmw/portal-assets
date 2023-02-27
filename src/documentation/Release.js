/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { getJSON } from './https-proxy-get.js'
import fs from 'fs'

const Settings = {
    BASE: 'https://api.github.com',
    OWNER: 'catenax-ng',
    REPO: 'tx-portal-assets',
}

const url = `${Settings.BASE}/repos/${Settings.OWNER}/${Settings.REPO}/git/refs/tags`

const saveLocal = (data) => fs.writeFileSync(
    './public/documentation/data/Releases.json',
    JSON.stringify(data
        .map(item => item.ref)
        .concat(process.argv.slice(2).map(arg => `refs/tags/${arg}`))
        .reverse(),
        null, 2)
);

//(async () => saveLocal(await getJSON(url)))()

fetch(url)
    .then((response) => response.json())
    .then(saveLocal)
